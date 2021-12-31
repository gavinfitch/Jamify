from .db import db
from .playlist_song import playlist_songs
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

        playlistSongs = db.session.query(playlist_songs).all()
        filteredPlaylistSongs = []
        for song in playlistSongs:
            if song[1] == self.id:
                filteredPlaylistSongs.append(song)

        songList = [song.to_dict() for song in self.songs]

        filteredSongs = []
        for playlistSong in filteredPlaylistSongs:
            for song in songList:
                if song['id'] == playlistSong[0]:
                    filteredSongs.append(song)

        # print("----------", "PLAYLIST ID ---> ", self.id, "FILTERED SONGS", filteredSongs, "----------")

        return {
            'id': self.id,
            'userId': self.userId,
            # 'user': self.user.to_dict(),
            'title': self.title,
            'coverPhoto_URL': self.coverPhoto_URL,
            'coverPhoto_s3Name': self.coverPhoto_s3Name,
            # 'songs': [song.to_dict() for song in self.songs]
            # 'songs': [song for song in filteredSongs],
            'songs': filteredSongs,
        }

    def to_dict2(self):

        playlistSongs = db.session.query(playlist_songs).all()
        filteredPlaylistSongs = []
        for song in playlistSongs:
            if song[1] == self.id:
                filteredPlaylistSongs.append(song)

        songList = [song.to_dict() for song in self.songs]

        filteredSongs = []
        for playlistSong in filteredPlaylistSongs:
            for song in songList:
                if song['id'] == playlistSong[0]:
                    filteredSongs.append(song)

        return {
            'id': self.id,
            'userId': self.userId,
            'user': self.user.to_dict(),
            'title': self.title,
            'coverPhoto_URL': self.coverPhoto_URL,
            'coverPhoto_s3Name': self.coverPhoto_s3Name,
            # 'songs': [song.to_dict() for song in self.songs]
            # 'songs': [song for song in filteredSongs],
            'songs': filteredSongs,
        }