import datetime
from flask_login import UserMixin
from sqlalchemy import DateTime
from werkzeug.security import generate_password_hash, check_password_hash
from .db import db

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    # Columns
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(250), nullable=False)
    username = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String, nullable=False, unique=True)
    photo_URL = db.Column(db.String(2000))
    photo_s3Name = db.Column(db.String(2000))
    hashed_password = db.Column(db.String(500), nullable=False)
    created_at = db.Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    songs = db.relationship("Song", back_populates="user")
    playlists = db.relationship("Playlist", back_populates="user")
    likes = db.relationship("Like", back_populates="user")
    library = db.relationship("Library_Song", back_populates="user")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'full_name': self.full_name,
            'username': self.username,
            'email': self.email,
            'photo_URL': self.photo_URL,
            'photo_s3Name': self.photo_s3Name,
            'songs': [song.to_dict() for song in self.songs],
            'playlists': [playlist.to_dict() for playlist in self.playlists],
            'likes': [like.to_dict() for like in self.likes],
            'library': [library_song.to_dict() for library_song in self.library]
        }
    