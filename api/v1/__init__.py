from flask import Blueprint, Response, request
from .users import users

v1 = Blueprint('v1', __name__)

v1.register_blueprint(users, url_prefix="/users")


@v1.get("/")
def index():
    return dict(next=["/users"])
