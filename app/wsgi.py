from flask import Flask, request
import toml
from .routes import router
from .config import Config
from database import mongo

mongo.init()


def app():
    a = Config(Flask(__name__)).app()
    router(a, request)
    return a
