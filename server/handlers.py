from framework import json_response, html_response, serve_static, not_found_json
from db import (
    create_user,
    get_user,
    get_all_users,
    update_user,
    delete_user,
    user_to_dict,
    user_to_admin_dict,
)
from validation import validate
from templates import (
    render_create_form,
    render_edit_form,
    render_success,
    render_profile,
    render_not_found,
)

def front_get(request):
    return html_response(200, render_create_form())

def users_list_get(request):
    rows = get_all_users()
    return json_response(200, {"users": [user_to_admin_dict(row) for row in rows]})

def users_post(request):
    errors = validate(request.data)
    if errors:
        if request.fmt == "form":
            return html_response(422, render_create_form(request.data, errors))
        return json_response(422, {"errors": errors})

    creds = create_user(request.data)
    if request.fmt == "form":
        return html_response(201, render_success(creds))
    return json_response(201, creds)

def user_get(request):
    row = get_user(int(request.params[0]))
    if not row:
        return html_response(404, render_not_found())
    return html_response(200, render_profile(row))

def user_put(request):
    user_id = int(request.params[0])
    errors = validate(request.data)
    if errors:
        if request.fmt == "form":
            return html_response(422, render_edit_form(get_user(user_id), errors, request.data))
        return json_response(422, {"errors": errors})

    update_user(user_id, request.data)
    row = get_user(user_id)
    if request.fmt == "form":
        return html_response(200, render_profile(row))
    return json_response(200, user_to_dict(row))

def user_delete(request):
    user_id = int(request.params[0])
    if not get_user(user_id):
        return not_found_json()
    delete_user(user_id)
    return json_response(200, {"deleted": user_id})

def user_edit_get(request):
    return html_response(200, render_edit_form(request.user))

def me_get(request):
    return json_response(200, user_to_dict(request.user))

def static_get(request):
    return serve_static(request.params[0])
