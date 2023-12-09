import datetime
from sqlalchemy import DateTime
from .db import db

class Like(db.Model):
    __tablename__ = "likes"

    # Columns
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    userId = db.Column(db.Integer, db.ForeignKey("users.id"))
    user = db.relationship("User", back_populates="likes")
    songId = db.Column(db.Integer, db.ForeignKey("songs.id"))
    song = db.relationship("Song", back_populates="likes")

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "songId": self.songId,
        }
    