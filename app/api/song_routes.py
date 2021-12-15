from flask import Blueprint
from app.models import Song

song_routes = Blueprint('songs', __name__)

@song_routes.route('/')
def allSongs():
    songs = Song.query.all()

    print("SONGS =>", songs)
    return {'songs': [song.to_dict() for song in songs]}