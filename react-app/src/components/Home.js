import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as songStore from '../store/song';

function Home() {
    const user = useSelector((state) => state.sessionReducer.user);
    const allSongs = useSelector((state) => state.songReducer.allSongs)
    const dispatch = useDispatch();

    let allSongsArr;
    if (allSongs) {
        allSongsArr = Object.values(allSongs)
    }

    let userPlaylistArr;
    if (user?.playlists) {
        userPlaylistArr = Object.values(user?.playlists)
    }

    useEffect(() => {
        // Get all songs
        dispatch(songStore.thunk_getAllSongs());
    }, [dispatch])

    return (
        <>
            <h1>All Songs</h1>
            {allSongsArr && allSongsArr.map((song) => {

                const splitDate = song.created_at.split(" ")
                const dateAdded = `${splitDate[2]} ${splitDate[1]}, ${splitDate[3]}`
                return <ul>
                    <li>
                        <img src={song.albumCover_URL} />
                    </li>
                    <li>
                        <div>{song.title}</div>
                        <div>{song.artist}</div>
                    </li>
                    <li>
                        <div>{song.album}</div>
                    </li>
                    <li>
                        <div>{dateAdded}</div>
                    </li>
                </ul>
            })}
            <h1>Logged-in user's playlists</h1>
            {userPlaylistArr && userPlaylistArr.map((playlist) => {
                return <ul>
                    <li>
                        <div>{playlist.title}</div>
                    </li>
                </ul>
            })}
        </>
    );
}

export default Home;