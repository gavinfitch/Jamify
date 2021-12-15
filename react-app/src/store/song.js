const ALL_SONGS = 'song/ALL_SONGS'

const allSongs = (songs) => ({
    type: ALL_SONGS,
    payload: songs
});

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