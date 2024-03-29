import datetime
from sqlalchemy import DateTime
from .db import db
from.playlist_song import playlist_songs

class Song(db.Model):
    __tablename__ = 'songs'

    # Columns
    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"))
    title = db.Column(db.String(250), nullable=False)
    song_URL = db.Column(db.String(2000), nullable=False)
    song_s3Name = db.Column(db.String(2000))
    album = db.Column(db.String(250), nullable=False)
    artist = db.Column(db.String(250), nullable=False)
    genre = db.Column(db.String(50))
    duration = db.Column(db.String(50))
    albumCover_URL = db.Column(db.String(2000))
    albumCover_s3Name = db.Column(db.String(2000))
    created_at = db.Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    user = db.relationship("User", back_populates="songs")
    likes = db.relationship("Like", back_populates="song", cascade="all, delete")
    library = db.relationship("Library_Song", back_populates="song", cascade="all, delete")
    playlists = db.relationship(
        "Playlist", 
        secondary=playlist_songs, 
        back_populates="songs"
    )

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'title': self.title,
            'song_URL': self.song_URL,
            'song_s3Name': self.song_s3Name,
            'album': self.album,
            'artist': self.artist,
            'genre': self.genre,
            'duration': self.duration,
            'albumCover_URL': self.albumCover_URL,
            'albumCover_s3Name': self.albumCover_s3Name,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
    