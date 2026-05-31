import hashlib
import hmac
import re
import secrets
import sqlite3

from config import ADMIN_LOGIN, ADMIN_PASSWORD, DB_PATH

_PBKDF2_ITERATIONS = 100_000

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def hash_password(password, salt=None):
    salt = salt or secrets.token_hex(16)
    digest = hashlib.pbkdf2_hmac(
        "sha256", password.encode("utf-8"), bytes.fromhex(salt), _PBKDF2_ITERATIONS
    )
    return f"pbkdf2${salt}${digest.hex()}"

def verify_password(password, stored):
    try:
        scheme, salt, digest = stored.split("$", 2)
    except ValueError:
        return False
    if scheme != "pbkdf2":
        return False
    expected = hashlib.pbkdf2_hmac(
        "sha256", password.encode("utf-8"), bytes.fromhex(salt), _PBKDF2_ITERATIONS
    ).hex()
    return hmac.compare_digest(expected, digest)

def init_db():
    with get_db() as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS users (
                id         INTEGER PRIMARY KEY AUTOINCREMENT,
                login      TEXT UNIQUE NOT NULL,
                password   TEXT NOT NULL,
                name       TEXT NOT NULL,
                phone      TEXT NOT NULL,
                email      TEXT NOT NULL,
                comment    TEXT,
                is_admin   INTEGER NOT NULL DEFAULT 0,
                created_at TEXT DEFAULT (datetime('now'))
            )
            """
        )

        columns = {row["name"] for row in conn.execute("PRAGMA table_info(users)")}
        if "is_admin" not in columns:
            conn.execute("ALTER TABLE users ADD COLUMN is_admin INTEGER NOT NULL DEFAULT 0")
    seed_admin()

def seed_admin():
    login = ADMIN_LOGIN
    password = ADMIN_PASSWORD
    existing = get_user_by_login(login)
    generated = False

    if not password:
        if existing:
            return
        password = secrets.token_urlsafe(9)
        generated = True

    pwd_hash = hash_password(password)
    with get_db() as conn:
        if existing:
            conn.execute(
                "UPDATE users SET password = ?, is_admin = 1 WHERE id = ?",
                (pwd_hash, existing["id"]),
            )
        else:
            conn.execute(
                "INSERT INTO users (login, password, name, phone, email, comment, is_admin) "
                "VALUES (?, ?, ?, ?, ?, ?, 1)",
                (login, pwd_hash, "Администратор", "", "", ""),
            )

    if generated:
        print("⚠ ADMIN_PASSWORD не задан в окружении.")
        print(f"  Сгенерирован пароль администратора: {password}")
        print(f"  Логин: {login}  (вход в админку: /admin)")

def get_user(user_id):
    with get_db() as conn:
        return conn.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()

def get_user_by_login(login):
    with get_db() as conn:
        return conn.execute("SELECT * FROM users WHERE login = ?", (login,)).fetchone()

def get_all_users():
    with get_db() as conn:
        return conn.execute(
            "SELECT * FROM users WHERE is_admin = 0 "
            "ORDER BY datetime(created_at) DESC, id DESC"
        ).fetchall()

def delete_user(user_id):
    with get_db() as conn:
        conn.execute("DELETE FROM users WHERE id = ? AND is_admin = 0", (user_id,))

def create_user(data):
    login = re.split(r"[@+\s]", str(data["email"]))[0] + secrets.token_hex(2)
    password = secrets.token_urlsafe(9)

    with get_db() as conn:
        cur = conn.execute(
            "INSERT INTO users (login, password, name, phone, email, comment) "
            "VALUES (?, ?, ?, ?, ?, ?)",
            (
                login,
                password,
                str(data["name"]).strip(),
                str(data["phone"]).strip(),
                str(data["email"]).strip(),
                str(data.get("comment", "")).strip(),
            ),
        )
        user_id = cur.lastrowid

    return {
        "login": login,
        "password": password,
        "profile": f"/users/{user_id}",
    }

def update_user(user_id, data):
    with get_db() as conn:
        conn.execute(
            "UPDATE users SET name = ?, phone = ?, email = ?, comment = ? WHERE id = ?",
            (
                str(data.get("name", "")).strip(),
                str(data.get("phone", "")).strip(),
                str(data.get("email", "")).strip(),
                str(data.get("comment", "")).strip(),
                user_id,
            ),
        )

def user_to_dict(row):
    return {
        "id": row["id"],
        "login": row["login"],
        "name": row["name"],
        "phone": row["phone"],
        "email": row["email"],
        "comment": row["comment"] or "",
        "profile": f"/users/{row['id']}",
    }

def user_to_admin_dict(row):
    return {
        "id": row["id"],
        "login": row["login"],
        "name": row["name"],
        "phone": row["phone"],
        "email": row["email"],
        "comment": row["comment"] or "",
        "created_at": row["created_at"],
        "profile": f"/users/{row['id']}",
    }
