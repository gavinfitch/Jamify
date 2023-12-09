import datetime
from sqlalchemy import DateTime
from .db import db
from .playlist_song import playlist_songs

class Playlist(db.Model):
    __tablename__ = 'playlists'

    # Columns
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


    def get_song_list(self):
        """
        Query all playlist_songs from the database - these aren't 
        actual song dictionaries
        """
        all_playlist_songs = db.session.query(playlist_songs).all()

        """
        Filter the playlist_songs to only be the ones with your 
        playlist_id. They're now in the order you added them in
        """
        filtered_playlist_songs = []
        for song in all_playlist_songs:
            playlist_id = song[1]
            if playlist_id == self.id:
                filtered_playlist_songs.append(song)

        # Get the actual song dictionaries (out of order)
        song_list = [song.to_dict() for song in self.songs]
        
        """
        Traverse the ordered playlist_songs and append the song dictionaries
        so that they're in the correct order
        """
        ordered_song_list = []
        for playlist_song in filtered_playlist_songs:
            for song in song_list:
                if song['id'] == playlist_song[0]:
                    ordered_song_list.append(song)
        return ordered_song_list


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'title': self.title,
            'coverPhoto_URL': self.coverPhoto_URL,
            'coverPhoto_s3Name': self.coverPhoto_s3Name,
            'songs': self.get_song_list()
        }
    
    
    def to_dict2(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'user': self.user.to_dict(),
            'title': self.title,
            'coverPhoto_URL': self.coverPhoto_URL,
            'coverPhoto_s3Name': self.coverPhoto_s3Name,
            'songs': self.get_song_list()
        }
    