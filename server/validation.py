import re

PHONE_RE = re.compile(r"^\+[0-9\s\-()]{7,}$")
EMAIL_RE = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]{2,}$")

def coerce_consent(value):
    if isinstance(value, bool):
        return value
    return str(value).strip().lower() in ("true", "on", "1", "yes")

def validate(data):
    errors = {}
    name = str(data.get("name", "")).strip()
    phone = str(data.get("phone", "")).strip()
    email = str(data.get("email", "")).strip()
    consent = coerce_consent(data.get("consent"))

    if not name:
        errors["name"] = "Имя обязательно"
    if not phone:
        errors["phone"] = "Номер телефона обязателен"
    elif not phone.startswith("+"):
        errors["phone"] = "Номер телефона должен начинаться с +"
    elif not PHONE_RE.match(phone):
        errors["phone"] = "Неверный формат номера телефона"
    if not EMAIL_RE.match(email):
        errors["email"] = "Неверный email"
    if not consent:
        errors["consent"] = "Необходимо согласие"

    return errors