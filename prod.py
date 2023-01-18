from multiprocessing import cpu_count
import sys
import os
from os import environ
import toml

environ.setdefault('ENV', 'production')
env = toml.load("config.toml")
wsgi_app = "app.wsgi:app()"
capture_output = True
pidfile = env.get("PIDFILE", "app.pid")
# daemon = True
bind = f"{env.get('HOST', os.environ.get('HOST', '0.0.0.0'))}:{env.get('PORT', os.environ.get('PORT'))}"
max_requests = 1000
# accesslog = "app.access.log"
# errorlog = "app.error.log"
worker_class = 'gevent'
workers = cpu_count()

# print("Logs at", accesslog, errorlog)
