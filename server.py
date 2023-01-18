from app.wsgi import app

a = app()
a.run(
    host=a.config.get("HOST", "127.0.0.1"),
    port=a.config.get("PORT", 5000),
    debug=(a.config["ENV"] == "development")
)
