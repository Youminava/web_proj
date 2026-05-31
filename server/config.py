import os
from pathlib import Path

HOST = "127.0.0.1"
PORT = 8000

BASE_DIR = Path(__file__).parent
DB_PATH = BASE_DIR / "data.db"
STATIC_DIR = BASE_DIR / "static"

ADMIN_LOGIN = os.environ.get("ADMIN_LOGIN", "admin")
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD")
