import toml
from pathlib import Path
from os import path as os_path


class Config():

    BASE_DIR = Path(__file__).resolve().parent.parent

    def __init__(self, app):
        app.config.from_file(os_path.join(self.BASE_DIR, "config.toml"), load=toml.load)
        self.application = app

    def app(self):
        return self.application



