from flask import Blueprint, request
from app.models import db, Playlist

playlist_routes = Blueprint('playlists', __name__)

# Get all playlists
@playlist_routes.route('/')
def all_playlists():
    playlists = Playlist.query.all()
    return {'playlists': [playlist.to_dict() for playlist in playlists]}