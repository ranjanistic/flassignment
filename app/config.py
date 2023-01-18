import toml
from pathlib import Path
from os import path as os_path

BASE_DIR = Path(__file__).resolve().parent.parent
Env = toml.load(os_path.join(BASE_DIR, "config.toml"))


class Config():

    def __init__(self, app):
        app.config.from_file(os_path.join(
            BASE_DIR, "config.toml"), load=toml.load)
        self.application = app

    def app(self):
        return self.application
