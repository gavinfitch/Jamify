import os
from flask import Flask, redirect, request
from flask_cors import CORS
from flask_login import LoginManager
from flask_migrate import Migrate
from flask_wtf.csrf import generate_csrf
from .api.auth_routes import auth_routes
from .api.playlist_routes import playlist_routes
from .api.song_routes import song_routes
from .api.user_routes import user_routes
from .config import Config
from .models import db, User
from .seeds import seed_commands

app = Flask(__name__)

# Setup Login Manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell Flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)

app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(playlist_routes, url_prefix='/api/playlists')
app.register_blueprint(song_routes, url_prefix='/api/songs')
app.register_blueprint(user_routes, url_prefix='/api/users')

db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)

# Since this app is deployed with Docker and Flask,
# we aren't using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')
