from api.v1 import v1
import json


def router(app, request):

    app.register_blueprint(v1, url_prefix='/v1')

#    @app.before_request
 #   def hook():

    @app.get("/")
    def index():
        return dict(next=["/v1"])
