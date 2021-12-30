from flask import Blueprint, request
from app.models import db, Song, Playlist, playlist_song, playlist_songs, Library_Song
from sqlalchemy import insert, desc


playlist_routes = Blueprint('playlists', __name__)

# Get all playlists
@playlist_routes.route('/')
def all_playlists():
    playlists = Playlist.query.order_by(desc(Playlist.created_at)).all()
    return {'playlists': [playlist.to_dict2() for playlist in playlists]}

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

    playlists = Playlist.query.order_by(desc(Playlist.created_at)).all()
    return {'playlists': [playlist.to_dict() for playlist in playlists]}

# Delete playlist
@playlist_routes.route("/<int:id>/", methods=['DELETE'])
def delete_playlist(id):
    playlistToDelete = Playlist.query.get(id)

    db.session.delete(playlistToDelete)
    db.session.commit()

    playlists = Playlist.query.order_by(desc(Playlist.created_at)).all()
    return {'playlists': [playlist.to_dict() for playlist in playlists]}

# Edit playlist
@playlist_routes.route("/<int:id>/edit", methods=['POST'])
def edit_song(id):
    playlistToUpdate = Playlist.query.get(id)
    playlistToUpdate.title = request.json["title"]

    if request.json["coverPhoto_URL"]:
        playlistToUpdate.coverPhoto_URL=request.json["coverPhoto_URL"],
        playlistToUpdate.coverPhoto_s3Name=request.json["coverPhoto_s3Name"]
    
    db.session.commit()

    playlists = Playlist.query.order_by(desc(Playlist.created_at)).all()
    return {'playlists': [playlist.to_dict() for playlist in playlists]}


# Add song to playlist
@playlist_routes.route("/<int:id>/addsong", methods=['POST'])
def addsong_playlist(id):

    addsong = insert(playlist_songs).values(
        song_id= request.json["songId"],
        playlist_id= request.json["playlistId"]
    )

    db.session.execute(addsong)
    db.session.commit()
    
    playlists = Playlist.query.order_by(desc(Playlist.created_at)).all()
    return {'playlists': [playlist.to_dict() for playlist in playlists]}


# Remove song from playlist
@playlist_routes.route("/<int:id>/removesong", methods=['POST'])
def removesong_playlist(id):
    
    playlist = Playlist.query.filter(Playlist.id == request.json["playlistId"]).first()
    song = Song.query.filter(Song.id == request.json["songId"]).first()
    playlist.songs.remove(song)

    db.session.commit()

    playlists = Playlist.query.order_by(desc(Playlist.created_at)).all()
    return {'playlists': [playlist.to_dict() for playlist in playlists]}

# Add song to library
@playlist_routes.route("/addtolibrary", methods=['POST'])
def addtolibrary():

    new_like = Library_Song(userId=request.json["userId"], songId=request.json["songId"])
    db.session.add(new_like)
    db.session.commit()

    playlists = Playlist.query.order_by(desc(Playlist.created_at)).all()
    return {'playlists': [playlist.to_dict() for playlist in playlists]}


# Remove song from library
@playlist_routes.route("/removefromlibrary", methods=['POST'])
def removefromlibrary():

    userId = request.json["userId"]
    songId = request.json["songId"]

    library_song = Library_Song.query.filter(Library_Song.userId == userId, Library_Song.songId == songId).first()

    db.session.delete(library_song)
    db.session.commit()

    playlists = Playlist.query.order_by(desc(Playlist.created_at)).all()
    return {'playlists': [playlist.to_dict() for playlist in playlists]}