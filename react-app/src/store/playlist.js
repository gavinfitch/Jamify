const ALL_PLAYLISTS = 'playlist/ALL_PLAYLISTS'

const allPlaylists = (playlists) => ({
    type: ALL_PLAYLISTS,
    payload: playlists
});

export const thunk_createPlaylist = ({ userId, title, coverPhoto_URL, coverPhoto_s3Name }) =>
    async (dispatch) => {
        const res = await fetch("/api/playlists/create", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId,
                title,
                coverPhoto_URL,
                coverPhoto_s3Name
            })
        });

        if (res.ok) {
            const playlists = await res.json();
            dispatch(allPlaylists(playlists));
            return playlists;
        }
    };

export const thunk_editPlaylist = ({ playlistToEdit, title, coverPhoto_URL, coverPhoto_s3Name }) =>
    async (dispatch) => {
        const res = await fetch(`/api/playlists/${playlistToEdit}/edit`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                playlistToEdit,
                title,
                coverPhoto_URL,
                coverPhoto_s3Name
            })
        });

        if (res.ok) {
            const playlists = await res.json();
            dispatch(allPlaylists(playlists));
            return playlists;
        }
    };

export const thunk_addToPlaylist = ({ playlistId, songId }) =>
    async (dispatch) => {
        const res = await fetch(`/api/playlists/${playlistId}/addsong`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                playlistId,
                songId
            })
        });

        if (res.ok) {
            const playlists = await res.json();
            dispatch(allPlaylists(playlists));
            return playlists;
        }
    };

export const thunk_addToLibrary = ({ userId, songId }) =>
    async (dispatch) => {
        const res = await fetch(`/api/playlists/addtolibrary`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId,
                songId
            })
        });

        if (res.ok) {
            const playlists = await res.json();
            dispatch(allPlaylists(playlists));
            return playlists;
        }
    };

export const thunk_removeFromLibrary = ({ songId, userId }) =>
    async (dispatch) => {
        const res = await fetch(`/api/playlists/removefromlibrary`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                songId,
                userId
            })
        });

        if (res.ok) {
            const playlists = await res.json();
            dispatch(allPlaylists(playlists));
            return playlists;
        }
    };

export const thunk_removeFromPlaylist = ({ playlistId, songId }) =>
    async (dispatch) => {
        const res = await fetch(`/api/playlists/${playlistId}/removesong`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                playlistId,
                songId
            })
        });

        if (res.ok) {
            const playlists = await res.json();
            dispatch(allPlaylists(playlists));
            return playlists;
        }
    };

export const thunk_deletePlaylist = ({ playlistId }) =>
    async (dispatch) => {
        const res = await fetch(`/api/playlists/${playlistId}/`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                playlistId
            })
        });

        if (res.ok) {
            const playlists = await res.json();
            dispatch(allPlaylists(playlists));
            return playlists;
        }
    };

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
            const playlists = await res.json();
            dispatch(allPlaylists(playlists));
            return playlists;
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