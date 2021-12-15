from .db import db
from.playlist_song import playlist_songs
import datetime
from sqlalchemy import DateTime


class Playlist(db.Model):
    __tablename__ = 'playlists'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"))
    title = db.Column(db.String(250), nullable=False)
    coverPhoto_URL = db.Column(db.String(2000))
    coverPhoto_s3Name = db.Column(db.String(2000))
    created_at = db.Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    user = db.relationship("User", back_populates="playlists")

    songs = db.relationship(
        "Song", 
        secondary=playlist_songs, 
        back_populates="playlists"
    )

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            # 'user': self.user.to_dict(),
            'title': self.title,
            'coverPhoto_URL': self.coverPhoto_URL,
            'coverPhoto_s3Name': self.coverPhoto_s3Name
        }