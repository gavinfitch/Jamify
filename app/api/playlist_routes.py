from flask import Blueprint, request
from app.models import db, Playlist

playlist_routes = Blueprint('playlists', __name__)

# Get all playlists
@playlist_routes.route('/')
def all_playlists():
    playlists = Playlist.query.all()
    return {'playlists': [playlist.to_dict() for playlist in playlists]}

# Create playlist
@playlist_routes.route('/create', methods=['POST'])
def create_playlist():
    new_playlist = Playlist(
        userId=request.json["userId"],
        title=request.json["title"],
        coverPhoto_URL=request.json["coverPhoto_URL"],
        coverPhoto_s3Name=request.json["coverPhoto_s3Name"]
    )

    db.session.add(new_playlist)
    db.session.commit()

    playlists = Playlist.query.all()
    return {'playlists': [playlist.to_dict() for playlist in playlists]}