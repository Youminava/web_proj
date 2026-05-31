from http.server import ThreadingHTTPServer

from config import HOST, PORT
from db import init_db
from framework import Handler
from urls import URLCONF

def main():
    init_db()
    Handler.urlconf = URLCONF
    server = ThreadingHTTPServer((HOST, PORT), Handler)
    print(f"Сервер запущен: http://{HOST}:{PORT}")
    server.serve_forever()

if __name__ == "__main__":
    main()
