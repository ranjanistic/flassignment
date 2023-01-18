from flask import Flask, request
import toml
from .routes import router
from .config import Config
from database import mongo
from flask_cors import CORS

mongo.init()


def app():
    a = Config(Flask(__name__)).app()
    CORS(a)
    router(a, request)
    return a
