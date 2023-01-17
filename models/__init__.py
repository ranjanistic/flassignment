from uuid import uuid4
import mongoengine as mongo

class User(mongo.Document):
    email = mongo.StringField(max_length=80,unique=True, required=True)
    phone = mongo.StringField(max_length=30, required=True, unique_with="country_prefix")
    country_prefix = mongo.StringField(max_length=10, required=True)
    first_name = mongo.StringField(max_length=100,required=True)
    last_name = mongo.StringField(max_length=100)

class Message(mongo.Document):
    subject = mongo.StringField(max_length=100,required=True)
    body = mongo.StringField(max_length=100,required=True)
    to = mongo.ReferenceField(User, reverse_delete_rule=mongo.CASCADE)

