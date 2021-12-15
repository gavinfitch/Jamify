import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import * as songStore from '../store/song';

function Home() {
    const user = useSelector((state) => state.sessionReducer.user);
    const allSongs = useSelector((state) => state.songReducer.allSongs)
    const dispatch = useDispatch();

    const [selectedSong, setSelectedSong] = useState('');

    let allSongsArr;
    if (allSongs) {
        allSongsArr = Object.values(allSongs)
    }

    let userPlaylistsArr;
    if (user?.playlists) {
        userPlaylistsArr = Object.values(user?.playlists)
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
                        <img onClick={() => {setSelectedSong(song); console.log(selectedSong.song_URL)}} src={song.albumCover_URL} />
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
            {userPlaylistsArr && userPlaylistsArr.map((playlist) => {
                return <ul>
                    <li>
                        <div>{playlist.title}</div>
                    </li>
                </ul>
            })}
            <AudioPlayer
                autoPlay
                src={selectedSong.song_URL}
                onPlay={e => console.log("onPlay")}
                // other props here
            />
        </>
    );
}

export default Home;