from flask import Blueprint,request
import json
from mongoengine.queryset.visitor import Q
from models import User, Message
from mongoengine.errors import *
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
        print(e)
        return dict(error="Something went wrong"), 500


@users.get("/search")
def lookup():
    try:
        query = Q()
        search = request.args.get('query',"").strip()
        max = int(request.args.get('max', 20) or 20)
        print(search)
        if search:
            query = (Q(email__startswith=search)|Q(phone__startswith=search)|Q(first_name__startswith=search)|Q(last_name__startswith=search) | Q(country_prefix__startswith=f"+{search}")
                     | Q(email__contains=search)|Q(phone__contains=search)|Q(first_name__contains=search)|Q(last_name__contains=search)
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
                cp = request.args.get('cp',"").strip()
                if cp:
                    pq = (pq & Q(country_prefix=f"+{cp}"))
                query = pq
            elif fname:
                query = Q(first_name=fname)
            elif lname:
                query = Q(last_name=lname)
            if not (lname or fname or phone or email):
                return dict(error="No query to search"), 400
        print(query)
        us = User.objects(query)[:max]
        us = json.loads(us.to_json())
        for u in us:
            u["_id"] = u["_id"]["$oid"]
        return dict(users=us)
    except ValidationError:
        return dict(error="User not found"), 404
    except Exception as e:
        print(e)
        return dict(error="Something went wrong"), 500

@users.post("/")
def create():
    try:
        u = User(
        email=request.json["email"],phone=request.json["phone"],
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
        print(e)
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
        print(e)
        return dict(error="Something went wrong"), 500


@users.put("/<string:userId>")
def update(userId):
    try:
        update = dict()
        email=request.json.get("email")
        if email:
            update = dict(**update, email=email)
        phone=request.json.get("phone")
        if phone:
            update = dict(**update,phone=phone)
        cp=request.json.get("cp")
        if cp:
            update = dict(**update,country_prefix=cp)
        fname=request.json.get("fname")
        if fname:
            update = dict(**update,first_name=fname)
        lname=request.json.get("lname")
        if lname:
            update = dict(**update,last_name=lname)
        u = User.objects(pk=userId).update_one(**update)
        if not u:
            raise ValidationError()
        return dict(message="Updated"), 202
    except ValidationError:
        return dict(error="User not found"), 404
    except NotUniqueError:
        return dict(error="Already exists"), 409
    except Exception as e:
        print(e)
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
        print(e)
        return dict(error="Something went wrong"), 500
