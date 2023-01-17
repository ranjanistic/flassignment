from flask import Flask
import toml
from .routes import router
from .config import Config

app = Config(Flask(__name__)).app()

router(app)

