from .db import db
import datetime
from sqlalchemy import DateTime

playlist_songs = db.Table(
    "playlist_songs",
    db.Column("song_id", db.Integer, db.ForeignKey("songs.id"), primary_key=True),
    db.Column("playlist_id", db.Integer, db.ForeignKey("playlists.id"), primary_key=True),
    db.Column("created_at", DateTime, default=datetime.datetime.utcnow),
    db.Column("updated_at", DateTime, default=datetime.datetime.utcnow)
)

