from app.wsgi import app

app.run(
    host=app.config["HOST"] or "127.0.0.1",
    port=app.config["PORT"] or 5000,
    debug=(app.config["ENV"] == "development")
)
