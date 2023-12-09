from flask import Blueprint, request
from sqlalchemy import desc, insert
from app.models import db, Library_Song, Playlist, playlist_songs, Song

playlist_routes = Blueprint('playlists', __name__)


# Gets all playlists in descending order by created at date (not user specific)
@playlist_routes.route('/')
def get_playlists():
    playlists = Playlist.query.order_by(desc(Playlist.created_at)).all()
    return {'playlists': [playlist.to_dict2() for playlist in playlists]}


# Creates a playlist by user_id
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

    playlists = Playlist.query.order_by(desc(Playlist.created_at)).all()
    return {'playlists': [playlist.to_dict2() for playlist in playlists]}


# Deletes a playlist by playlist_id
@playlist_routes.route("/<int:id>/", methods=['POST'])
def delete_playlist(id):
    playlist_to_delete = Playlist.query.get(id)
    db.session.delete(playlist_to_delete)
    db.session.commit()

    playlists = Playlist.query.order_by(desc(Playlist.created_at)).all()
    return {'playlists': [playlist.to_dict2() for playlist in playlists]}


# Updates a playlist by playlist_id
@playlist_routes.route("/<int:id>/edit", methods=['POST'])
def update_playlist(id):
    playlist_to_update = Playlist.query.get(id)
    playlist_to_update.title = request.json["title"]

    if request.json["coverPhoto_URL"]:
        playlist_to_update.coverPhoto_URL=request.json["coverPhoto_URL"],
        playlist_to_update.coverPhoto_s3Name=request.json["coverPhoto_s3Name"]
    db.session.commit()

    playlists = Playlist.query.order_by(desc(Playlist.created_at)).all()
    return {'playlists': [playlist.to_dict2() for playlist in playlists]}


# Adds a song to a playlist by playlist_id
@playlist_routes.route("/<int:id>/addsong", methods=['POST'])
def add_song_to_playlist(id):
    added_song = insert(playlist_songs).values(
        playlist_id= request.json["playlistId"],
        song_id= request.json["songId"]
    )
    db.session.execute(added_song)
    db.session.commit()
    
    playlists = Playlist.query.order_by(desc(Playlist.created_at)).all()
    return {'playlists': [playlist.to_dict2() for playlist in playlists]}


# Removes a song from a playlist by playlist_id
@playlist_routes.route("/<int:id>/removesong", methods=['POST'])
def removesong_playlist(id):
    playlist = Playlist.query.filter(Playlist.id == request.json["playlistId"]).first()
    song = Song.query.filter(Song.id == request.json["songId"]).first()
    playlist.songs.remove(song)
    db.session.commit()

    playlists = Playlist.query.order_by(desc(Playlist.created_at)).all()
    return {'playlists': [playlist.to_dict2() for playlist in playlists]}


# Adds a song to a user's library by user_id
@playlist_routes.route("/addtolibrary", methods=['POST'])
def addtolibrary():
    added_song = Library_Song(userId=request.json["userId"], songId=request.json["songId"])
    db.session.add(added_song)
    db.session.commit()

    playlists = Playlist.query.order_by(desc(Playlist.created_at)).all()
    return {'playlists': [playlist.to_dict2() for playlist in playlists]}


# Removes a song from a user's library by user_id
@playlist_routes.route("/removefromlibrary", methods=['POST'])
def removefromlibrary():
    user_id = request.json["userId"]
    song_id = request.json["songId"]
    song = Library_Song.query.filter(Library_Song.userId == user_id, Library_Song.songId == song_id).first()
    db.session.delete(song)
    db.session.commit()

    playlists = Playlist.query.order_by(desc(Playlist.created_at)).all()
    return {'playlists': [playlist.to_dict2() for playlist in playlists]}