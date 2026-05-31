import re

from framework import Endpoint
from auth import auth_user, auth_me, auth_admin, auth_user_or_admin
from handlers import (
    front_get,
    users_list_get,
    users_post,
    user_get,
    user_put,
    user_delete,
    user_edit_get,
    me_get,
    static_get,
)

def route(pattern, **methods):
    return (re.compile(pattern), methods)

URLCONF = [
    route(r"^/$", GET=Endpoint(front_get)),
    route(
        r"^/users$",
        GET=Endpoint(users_list_get, auth=auth_admin),
        POST=Endpoint(users_post),
    ),
    route(
        r"^/users/(\d+)$",
        GET=Endpoint(user_get),
        PUT=Endpoint(user_put, auth=auth_user_or_admin),
        DELETE=Endpoint(user_delete, auth=auth_admin),
    ),
    route(r"^/users/(\d+)/edit$", GET=Endpoint(user_edit_get, auth=auth_user)),
    route(r"^/me$", GET=Endpoint(me_get, auth=auth_me)),
    route(r"^/static/(.+)$", GET=Endpoint(static_get)),
]
