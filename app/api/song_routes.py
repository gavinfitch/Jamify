from flask import Blueprint, request
from app.models import db, Song

song_routes = Blueprint('songs', __name__)

@song_routes.route('/')
def all_songs():
    songs = Song.query.all()
    return {'songs': [song.to_dict() for song in songs]}

@song_routes.route('/upload')
def upload_song():
    new_song = Song(
        userId=request.json["userId"],
        title=request.json["title"],
        song_URL=request.json["song_URL"],
        song_s3Name=request.json["song_s3Name"],
        album=request.json["album"],
        artist=request.json["artist"],
        genre=request.json["genre"],
        albumCover_URL=request.json["albumCover_URL"],
        albumCover_s3Name=request.json["albumCover_s3Name"]
    )

    db.session.add(new_song)
    db.session.commit()

    songs = Song.query.all()
    return {'songs': [song.to_dict() for song in songs]}