import pytest
from app.wsgi import app as myapp

@pytest.fixture()
def app():
    app = myapp()
    app.config.update({
        "TESTING": True,
        "ENV":"testing"
    })
    yield app


@pytest.fixture()
def client(app):
    return app.test_client()


@pytest.fixture()
def runner(app):
    return app.test_cli_runner()
