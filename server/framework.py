import json
import urllib.parse
import xml.etree.ElementTree as ET
from collections import namedtuple
from http.server import BaseHTTPRequestHandler

from config import STATIC_DIR

Endpoint = namedtuple("Endpoint", ["handler", "auth"], defaults=[None])

class Request:
    def __init__(self, method, path, headers, data, fmt):
        self.method = method
        self.http_method = None
        self.path = path
        self.headers = headers
        self.data = data
        self.fmt = fmt
        self.params = ()
        self.user = None

class Response:
    def __init__(self, status, body=b"", content_type="text/html; charset=utf-8", headers=None):
        if isinstance(body, str):
            body = body.encode("utf-8")
        self.status = status
        self.body = body
        self.headers = {"Content-Type": content_type}
        if headers:
            self.headers.update(headers)

def json_response(status, payload):
    body = json.dumps(payload, ensure_ascii=False)
    return Response(status, body, "application/json; charset=utf-8")

def html_response(status, markup):
    return Response(status, markup, "text/html; charset=utf-8")

def unauthorized():
    return Response(401, b"", headers={"WWW-Authenticate": 'Basic realm="users"'})

def not_found_json():
    return json_response(404, {"error": "Not found"})

STATIC_MIME = {
    ".css": "text/css; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".svg": "image/svg+xml",
}

def serve_static(rel_path):
    target = (STATIC_DIR / rel_path).resolve()
    try:
        target.relative_to(STATIC_DIR.resolve())
    except ValueError:
        return not_found_json()
    if not target.is_file():
        return not_found_json()
    mime = STATIC_MIME.get(target.suffix.lower(), "application/octet-stream")
    return Response(200, target.read_bytes(), mime)

def dispatch(request, urlconf):
    for pattern, methods in urlconf:
        match = pattern.match(request.path)
        if not match:
            continue
        endpoint = methods.get(request.method)
        if endpoint is None:
            continue
        request.params = match.groups()
        if endpoint.auth is not None:
            user = endpoint.auth(request)
            if user is None:
                return unauthorized()
            request.user = user
        return endpoint.handler(request)
    return not_found_json()

class Handler(BaseHTTPRequestHandler):
    urlconf = []

    def _read_body(self):
        length = int(self.headers.get("Content-Length", 0))
        raw = self.rfile.read(length) if length else b""
        ctype = self.headers.get("Content-Type", "")
        if "xml" in ctype:
            root = ET.fromstring(raw)
            return {child.tag: (child.text or "") for child in root}, "xml"
        if "x-www-form-urlencoded" in ctype:
            parsed = urllib.parse.parse_qs(raw.decode("utf-8"))
            return {k: v[0] for k, v in parsed.items()}, "form"
        return json.loads(raw or b"{}"), "json"

    def _build_request(self, http_method):
        path = urllib.parse.urlsplit(self.path).path
        data, fmt = {}, "json"
        if http_method in ("POST", "PUT"):
            data, fmt = self._read_body()

        method = http_method

        if http_method == "POST" and fmt == "form":
            override = str(data.get("_method", "")).upper()
            if override in ("PUT", "DELETE"):
                method = override

        request = Request(method, path, self.headers, data, fmt)
        request.http_method = http_method
        return request

    def _run(self, http_method):
        try:
            request = self._build_request(http_method)
        except (json.JSONDecodeError, ET.ParseError, ValueError):
            return self._write(json_response(400, {"error": "Некорректное тело запроса"}))
        self._write(dispatch(request, type(self).urlconf))

    def _set_cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")

    def _write(self, response):
        self.send_response(response.status)
        for key, value in response.headers.items():
            self.send_header(key, value)
        self._set_cors()
        self.send_header("Content-Length", str(len(response.body)))
        self.end_headers()
        if response.body:
            self.wfile.write(response.body)

    def do_GET(self):
        self._run("GET")

    def do_POST(self):
        self._run("POST")

    def do_PUT(self):
        self._run("PUT")

    def do_DELETE(self):
        self._run("DELETE")

    def do_OPTIONS(self):
        self.send_response(204)
        self._set_cors()
        self.end_headers()
