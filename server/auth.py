import base64

from db import get_user, get_user_by_login, verify_password

def _basic_credentials(headers):
    header = headers.get("Authorization", "")
    if not header.startswith("Basic "):
        return None
    try:
        login, password = base64.b64decode(header[6:]).decode("utf-8").split(":", 1)
    except (ValueError, UnicodeDecodeError):
        return None
    return login, password

def auth_user(request):
    creds = _basic_credentials(request.headers)
    if not creds:
        return None
    row = get_user(int(request.params[0]))
    if row and row["login"] == creds[0] and verify_password(creds[1], row["password"]):
        return row
    return None

def auth_me(request):
    creds = _basic_credentials(request.headers)
    if not creds:
        return None
    row = get_user_by_login(creds[0])
    if row and not row["is_admin"] and verify_password(creds[1], row["password"]):
        return row
    return None

def auth_admin(request):
    creds = _basic_credentials(request.headers)
    if not creds:
        return None
    row = get_user_by_login(creds[0])
    if row and row["is_admin"] and verify_password(creds[1], row["password"]):
        return row
    return None

def auth_user_or_admin(request):
    return auth_user(request) or auth_admin(request)
