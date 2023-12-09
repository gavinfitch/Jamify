from flask import Blueprint, request
from sqlalchemy import desc
from app.models import db, Like, Song

song_routes = Blueprint('songs', __name__)


# Gets all songs in descending order by created at date (not user specific)
@song_routes.route('/')
def get_songs():
    songs = Song.query.order_by(desc(Song.created_at)).all()
    return {'songs': [song.to_dict() for song in songs]}


# Uploads a song by user_id
@song_routes.route('/upload', methods=['POST'])
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

    songs = Song.query.order_by(desc(Song.created_at)).all()
    return {'songs': [song.to_dict() for song in songs]}


# Deletes a song by song_id
@song_routes.route("/<int:id>", methods=['POST'])
def delete_song(id):
    song_to_delete = Song.query.get(id)
    db.session.delete(song_to_delete)
    db.session.commit()

    songs = Song.query.order_by(desc(Song.created_at)).all()
    return {'songs': [song.to_dict() for song in songs]}


# Updates a song by song_id
@song_routes.route("/<int:id>/edit", methods=['POST'])
def update_song(id):
    song_to_update = Song.query.get(id)
    song_to_update.title = request.json["title"]
    song_to_update.album = request.json["album"]
    song_to_update.artist = request.json["artist"]
    song_to_update.genre = request.json["genre"]

    if request.json["albumCover_URL"]:
        song_to_update.albumCover_URL=request.json["albumCover_URL"],
        song_to_update.albumCover_s3Name=request.json["albumCover_s3Name"]
    db.session.commit()

    songs = Song.query.order_by(desc(Song.created_at)).all()
    return {'songs': [song.to_dict() for song in songs]}


# Likes a song by user_id 
@song_routes.route("/<int:id>/like", methods=["POST"])
def like_song(id):
    user_id = request.json["userId"]
    song_id = request.json["songId"]
    like = Like.query.filter(Like.userId == user_id, Like.songId == song_id).first()

    if like:
        db.session.delete(like)
    else:
        new_like = Like(userId=user_id, songId=song_id)
        db.session.add(new_like)   
    db.session.commit()

    songs = Song.query.order_by(desc(Song.created_at)).all()
    return {'songs': [song.to_dict() for song in songs]}
     