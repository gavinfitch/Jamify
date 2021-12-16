const ALL_SONGS = 'song/ALL_SONGS'

const allSongs = (songs) => ({
    type: ALL_SONGS,
    payload: songs
});

export const thunk_uploadSong = ({ userId, title, song_URL, song_s3Name, album, artist, genre, albumCover_URL, albumCover_s3Name }) =>
    async (dispatch) => {
        const res = await fetch("/api/songs/upload", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId,
                title,
                song_URL,
                song_s3Name,
                album,
                artist,
                genre,
                albumCover_URL,
                albumCover_s3Name
            })
        });

        if (res.ok) {
            const songs = await res.json();
            dispatch(allSongs(songs));
            return songs;
        }
    };

export const thunk_deleteSong = ({ songId }) => 
    async (dispatch) => {
        const res = await fetch(`/api/songs/${songId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                songId
            })
    });
      
        if (res.ok) {
            const songs = await res.json();
            dispatch(allSongs(songs));
            return songs;
        }
    };

export const thunk_getAllSongs = () =>
    async (dispatch) => {
        const res = await fetch(`/api/songs/`)

        if (res.ok) {
            const songs = await res.json();
            dispatch(allSongs(songs));
            return songs;
        }
    };

export const songReducer = (state = {}, action) => {
    switch (action.type) {
        case ALL_SONGS: {
            const newState = { ...state }
            newState['allSongs'] = action.payload.songs;
            return newState;
        }
        default:
            return state;
    }
};