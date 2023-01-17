from flask import Flask, request
import toml
from .routes import router
from .config import Config
from database import mongo

mongo.init()

app = Config(Flask(__name__)).app()

router(app, request)
