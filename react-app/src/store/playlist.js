const ALL_PLAYLISTS = 'playlist/ALL_PLAYLISTS'

const allPlaylists = (playlists) => ({
    type: ALL_PLAYLISTS,
    payload: playlists
});

// export const thunk_uploadSong = ({ userId, title, song_URL, song_s3Name, album, artist, genre, albumCover_URL, albumCover_s3Name }) =>
//     async (dispatch) => {
//         const res = await fetch("/api/songs/upload", {
//             method: 'POST',
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 userId,
//                 title,
//                 song_URL,
//                 song_s3Name,
//                 album,
//                 artist,
//                 genre,
//                 albumCover_URL,
//                 albumCover_s3Name
//             })
//         });

//         if (res.ok) {
//             const songs = await res.json();
//             dispatch(allSongs(songs));
//             return songs;
//         }
//     };

// export const thunk_deleteSong = ({ songId }) =>
//     async (dispatch) => {
//         const res = await fetch(`/api/songs/${songId}`, {
//             method: 'DELETE',
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 songId
//             })
//         });

//         if (res.ok) {
//             const songs = await res.json();
//             dispatch(allSongs(songs));
//             return songs;
//         }
//     };

// export const thunk_editSong = ({ songId, title, album, artist, genre, albumCover_URL, albumCover_s3Name }) =>
//     async (dispatch) => {
//         const res = await fetch(`/api/songs/${songId}/edit`, {
//             method: 'POST',
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 songId,
//                 title,
//                 album,
//                 artist,
//                 genre,
//                 albumCover_URL,
//                 albumCover_s3Name
//             })
//         });

//         if (res.ok) {
//             const songs = await res.json();
//             dispatch(allSongs(songs));
//             return songs;
//         }
//     };

export const thunk_getAllPlaylists = () =>
    async (dispatch) => {
        const res = await fetch(`/api/playlists/`)

        if (res.ok) {
            const songs = await res.json();
            dispatch(allPlaylists(songs));
            return songs;
        }
    };

export const playlistReducer = (state = {}, action) => {
    switch (action.type) {
        case ALL_PLAYLISTS: {
            const newState = { ...state }
            newState['allPlaylists'] = action.payload.playlists;
            return newState;
        }
        default:
            return state;
    }
};