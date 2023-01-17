from mongoengine import connect, disconnect
from app.config import Env

connection = None

def init():
    connection = connect(host=Env["MONGO_URI"], db=Env["DB_NAME"])

def terminate():
    disconnect()

