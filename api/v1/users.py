from flask import Blueprint, request
import json
from mongoengine.queryset.visitor import Q
from models import User, Message
from mongoengine.errors import *
from utils.mail import sendEmail
import logging

users = Blueprint('users', __name__)


@users.get("/")
def get_all():
    try:
        us = User.objects()
        us = json.loads(us.to_json())
        for u in us:
            u["_id"] = u["_id"]["$oid"]
        return dict(users=us)
    except Exception as e:
        logging.error(e)
        return dict(error="Something went wrong"), 500


@users.get("/search")
def lookup():
    try:
        query = Q()
        search = request.args.get('query', "").strip()
        max = int(request.args.get('max', 20) or 20)
        if search:
            query = (Q(email__startswith=search) | Q(phone__startswith=search) | Q(first_name__startswith=search) | Q(last_name__startswith=search) | Q(country_prefix__startswith=f"+{search}")
                     | Q(email__contains=search) | Q(phone__contains=search) | Q(first_name__contains=search) | Q(last_name__contains=search)
                     )
        else:
            email = request.args.get('email')
            phone = request.args.get('phone')
            fname = request.args.get('fname')
            lname = request.args.get('lname')
            if email:
                query = Q(email=email)
            elif phone:
                pq = Q(phone=phone)
                cp = request.args.get('cp', "").strip()
                if cp:
                    pq = (pq & Q(country_prefix=f"+{cp}"))
                query = pq
            elif fname:
                query = Q(first_name=fname)
            elif lname:
                query = Q(last_name=lname)
            if not (lname or fname or phone or email):
                return dict(error="No query to search"), 400
        us = User.objects(query)[:max]
        us = json.loads(us.to_json())
        for u in us:
            u["_id"] = u["_id"]["$oid"]
        return dict(users=us)
    except ValidationError:
        return dict(error="User not found"), 404
    except Exception as e:
        logging.error(e)
        return dict(error="Something went wrong"), 500


@users.post("/")
def create():
    try:
        u = User(
            email=request.json["email"], phone=request.json["phone"],
            country_prefix=request.json["cp"],
            first_name=request.json["fname"],
            last_name=request.json["lname"]
        )
        u.save()
        u = json.loads(u.to_json())
        u["_id"] = u["_id"]["$oid"]
        return u, 201
    except NotUniqueError:
        return dict(error="Already exists"), 409
    except Exception as e:
        logging.error(e)
        return dict(error="Something went wrong"), 500


@users.get("/<string:userId>")
def get(userId):
    try:
        u = User.objects(pk=userId).first()
        if not u:
            raise ValidationError()
        u = json.loads(u.to_json())
        u["_id"] = u["_id"]["$oid"]
        return u
    except ValidationError:
        return dict(error="User not found"), 404
    except Exception as e:
        logging.error(e)
        return dict(error="Something went wrong"), 500


@users.put("/<string:userId>")
def update(userId):
    try:
        update = dict()
        email = request.json.get("email")
        if email:
            update = dict(**update, email=email)
        phone = request.json.get("phone")
        if phone:
            update = dict(**update, phone=phone)
        cp = request.json.get("cp")
        if cp:
            update = dict(**update, country_prefix=cp)
        fname = request.json.get("fname")
        if fname:
            update = dict(**update, first_name=fname)
        lname = request.json.get("lname")
        if lname:
            update = dict(**update, last_name=lname)
        u = User.objects(pk=userId).update_one(**update)
        if not u:
            raise ValidationError()
        return dict(message="Updated"), 202
    except ValidationError:
        return dict(error="User not found"), 404
    except NotUniqueError:
        return dict(error="Already exists"), 409
    except Exception as e:
        logging.error(e)
        return dict(error="Something went wrong"), 500


@users.delete("/<string:userId>")
def delete(userId):
    try:
        u = User.objects(pk=userId).delete()
        if not u:
            raise ValidationError()
        return dict(message="Deleted")
    except ValidationError:
        return dict(error="User not found"), 404
    except NotUniqueError:
        return dict(error="Already exists"), 409
    except Exception as e:
        logging.error(e)
        return dict(error="Something went wrong"), 500


@users.post("/<string:userId>/mail")
def send_mail(userId):
    try:
        u = User.objects(pk=userId).first()
        if not u:
            raise ValidationError()
        subject = request.json.get("subject", "Welcome").strip() or "Welcome"
        message = request.json.get("message")
        apikey = request.json.get("apikey")
        fromMail = request.json.get("fromMail")
        if not message:
            return dict(error="Message is required"), 400
        m = Message(subject=subject, message=message, to=u)
        m.save()
        sent = sendEmail(to=u.email, subject=m.subject,
                         message=m.message, apikey=apikey, fromMail=fromMail)
        if not sent:
            return dict(error="Something went wrong with tbe third party email service"), 503
        m.sent = True
        m.save()
        return dict(message="Email sent", data=str(sent))
    except ValidationError:
        return dict(error="User not found"), 404
    except Exception as e:
        logging.error(e)
        return dict(error="Something went wrong"), 500


@users.post("/mail")
def send_mails():
    try:
        us = User.objects()
        if not len(us):
            return dict(error="No users present"), 403
        subject = request.json.get("subject", "Welcome").strip() or "Welcome"
        message = request.json.get("message", "").strip()
        apikey = request.json.get("apikey")
        fromMail = request.json.get("fromMail")
        if not message:
            return dict(error="Message is required"), 400
        ms = list(map(lambda u: Message(subject=subject,
                  message=message, to=u, sent=True), us))
        sent = sendEmail(to=list(map(lambda u: u.email, us)), subject=subject,
                         message=message, apikey=apikey, fromMail=fromMail)
        if not sent:
            return dict(error="Something went wrong with tbe third party email service"), 503
        Message.objects.insert(ms)
        return dict(message="Emails sent to everyone", data=str(sent))
    except Exception as e:
        logging.error(e)
        return dict(error="Something went wrong"), 500
