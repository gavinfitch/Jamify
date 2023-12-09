import datetime
from sqlalchemy import DateTime
from .db import db

class Library_Song(db.Model):
    __tablename__ = "library_songs"

    # Columns
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    userId = db.Column(db.Integer, db.ForeignKey("users.id"))
    user = db.relationship("User", back_populates="library")
    songId = db.Column(db.Integer, db.ForeignKey("songs.id"))
    song = db.relationship("Song", back_populates="library")

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "songId": self.songId,
        }
    