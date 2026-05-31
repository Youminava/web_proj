from html import escape

from validation import coerce_consent

FIELDS = (
    ("name", "text", "Имя"),
    ("phone", "tel", "Телефон"),
    ("email", "email", "Email"),
)

def html_page(title, body):
    return (
        "<!doctype html><html lang='ru'><head>"
        "<meta charset='utf-8'>"
        "<meta name='viewport' content='width=device-width, initial-scale=1'>"
        f"<title>{escape(title)}</title>"
        "<link rel='stylesheet' href='/static/style.css'>"
        f"</head><body><div class='page'>{body}</div></body></html>"
    )

def _field(name, ftype, label, value, error):
    err = f"<p class='errors'>{escape(error)}</p>" if error else ""
    return (
        f"<p><label>{escape(label)}<br>"
        f"<input type='{ftype}' name='{name}' value='{escape(str(value or ''))}'>"
        f"</label>{err}</p>"
    )

def _textarea(name, label, value):
    return (
        f"<p><label>{escape(label)}<br>"
        f"<textarea name='{name}' rows='3'>{escape(str(value or ''))}</textarea>"
        "</label></p>"
    )

def render_create_form(values=None, errors=None):
    values = values or {}
    errors = errors or {}

    inputs = "".join(
        _field(name, ftype, label, values.get(name, ""), errors.get(name))
        for name, ftype, label in FIELDS
    )
    inputs += _textarea("comment", "Комментарий", values.get("comment", ""))

    checked = "checked" if (not values or coerce_consent(values.get("consent"))) else ""
    consent_err = f"<p class='errors'>{escape(errors['consent'])}</p>" if errors.get("consent") else ""

    body = (
        "<h1>Оставить заявку</h1>"
        "<form method='post' action='/users'>"
        f"{inputs}"
        "<p><label>"
        f"<input type='checkbox' name='consent' value='true' {checked}> "
        "Согласие на обработку персональных данных"
        f"</label>{consent_err}</p>"
        "<p><button type='submit'>Отправить</button></p>"
        "</form>"
    )
    return html_page("Оставить заявку", body)

def render_edit_form(row, errors=None, values=None):
    errors = errors or {}
    if values is None:
        values = {
            "name": row["name"],
            "phone": row["phone"],
            "email": row["email"],
            "comment": row["comment"] or "",
        }

    inputs = "".join(
        _field(name, ftype, label, values.get(name, ""), errors.get(name))
        for name, ftype, label in FIELDS
    )
    inputs += _textarea("comment", "Комментарий", values.get("comment", ""))

    user_id = row["id"]
    body = (
        "<h1>Редактирование профиля</h1>"
        f"<p>Логин: <b>{escape(row['login'])}</b></p>"
        f"<form method='post' action='/users/{user_id}'>"
        "<input type='hidden' name='_method' value='put'>"
        "<input type='hidden' name='consent' value='true'>"
        f"{inputs}"
        "<p><button type='submit'>Сохранить</button></p>"
        "</form>"
        f"<p><a href='/users/{user_id}'>К профилю</a></p>"
    )
    return html_page("Редактирование", body)

def render_success(creds):
    return html_page(
        "Заявка принята",
        "<h1>Заявка принята</h1>"
        f"<p>Логин: <b>{escape(creds['login'])}</b></p>"
        f"<p>Пароль: <b>{escape(creds['password'])}</b></p>"
        f"<p><a href='{escape(creds['profile'])}'>Перейти в профиль</a></p>"
        f"<p><a href='{escape(creds['profile'])}/edit'>Редактировать заявку</a></p>",
    )

def render_profile(row):
    return html_page(
        "Профиль",
        "<h1>Профиль пользователя</h1>"
        f"<p>Логин: <b>{escape(row['login'])}</b></p>"
        f"<p>Имя: {escape(row['name'])}</p>"
        f"<p>Телефон: {escape(row['phone'])}</p>"
        f"<p>Email: {escape(row['email'])}</p>"
        f"<p>Комментарий: {escape(row['comment'] or '')}</p>"
        f"<p><a href='/users/{row['id']}/edit'>Редактировать</a></p>",
    )

def render_not_found():
    return html_page("Не найдено", "<h1>Пользователь не найден</h1>")
