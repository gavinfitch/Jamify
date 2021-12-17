import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import S3 from 'react-aws-s3';
import * as songStore from '../store/song';
import * as playlistStore from '../store/playlist';
import './Home.css';

function Home() {
    const user = useSelector((state) => state.sessionReducer.user);
    const allSongs = useSelector((state) => state.songReducer.allSongs)
    const dispatch = useDispatch();
    const history = useHistory();

    const [selectedSong, setSelectedSong] = useState('');

    let allSongsArr;
    if (allSongs) {
        allSongsArr = Object.values(allSongs)
    }

    let userPlaylistsArr;
    if (user?.playlists) {
        userPlaylistsArr = Object.values(user?.playlists)
    }

    const s3envKey = process.env.REACT_APP_AWS_KEY;
    const s3envSecretKey = process.env.REACT_APP_AWS_SECRET_KEY;

    const config = {
        bucketName: 'jamify',
        region: 'us-west-2',
        accessKeyId: s3envKey,
        secretAccessKey: s3envSecretKey,
    }

    const ReactS3Client = new S3(config);

    const deleteSong = async (songId, song_s3Name) => {

        await ReactS3Client
            .deleteFile(song_s3Name)
            .then(response => console.log(response))
            .catch(err => console.error(err))

        await dispatch(songStore.thunk_deleteSong({ songId }))
    };


    useEffect(() => {
        // Get all songs
        dispatch(songStore.thunk_getAllSongs());
        // Get all playlists
        dispatch(playlistStore.thunk_getAllPlaylists());
    }, [dispatch])

    return (
        <>
            <div className="page_container">
                <div className="sidebar">
                    <div className="sideNav_container">
                        <ul>
                            <li>Home</li>
                            <li>Search</li>
                            <li>Your Library</li>
                        </ul>
                    </div>
                    <div className="sideForm_container">
                        <ul>
                            <li onClick={() => history.push(`/songs/upload/`)}>Upload Song</li>
                            <li>Create Playlist</li>
                            <li>Liked Songs</li>
                        </ul>
                    </div>
                    <div className="playlist_container">
                        <ul>
                            {userPlaylistsArr && userPlaylistsArr.map((playlist) => {
                                return <li>
                                    <div>{playlist.title}</div>
                                </li>
                            })}
                        </ul>
                    </div>
                </div>
                <div className="banner">
                    <div className="logo_profileButton_container">
                        <div className="banner_logo">
                            <div className="bannerLogo_circle"><i class="fas fa-headphones"></i></div>Jamify
                        </div>
                        <button className="profileButton">
                            <div className="profileButton_thumbnail"></div>
                            <div className="profileButton_username">{user?.username}</div>
                            <i class="fas fa-caret-down"></i>
                        </button>
                    </div>
                    <div className="banner_mainText">Welcome, {user?.username}</div>
                    <div className="song_container">
                        <ul className="playlist_header">
                            <li>#</li>
                            <li>TITLE</li>
                            <li>ALBUM</li>
                            <li>DATE ADDED</li>
                            <li>DURATION</li>
                        </ul>
                        {allSongsArr && allSongsArr.map((song, index) => {

                            const splitDate = song.created_at.split(" ")
                            const dateAdded = `${splitDate[2]} ${splitDate[1]}, ${splitDate[3]}`
                            return <ul className="playlist_row">
                                <li>{index + 1}</li>
                                <li className="titleAndButtons_container">
                                    <div className="playlistTitle_container">
                                        <img onClick={() => setSelectedSong(song)} className="albumCover_thumbnail" src={song.albumCover_URL}></img>
                                        <div>
                                            <div className="playlist_songTitle">{song.title}</div>
                                            <div>{song.artist}</div>
                                        </div>
                                    </div>
                                    {user.id == song.userId && <div className="edit_delete_container">
                                        <div onClick={() => history.push(`/songs/${song.id}/edit`)}><i class="fas fa-edit"></i></div>
                                        <div onClick={() => deleteSong(song.id, song.song_s3Name)}><i class="fas fa-trash-alt"></i></div>
                                    </div>}
                                </li>
                                <li>{song.album}</li>
                                <li>{dateAdded}</li>
                                <li>3:18</li>
                            </ul>
                        })}
                    </div>
                </div>
            </div>


            {/* <h1>All Songs</h1> */}
            {/* {allSongsArr && allSongsArr.map((song) => {

                const splitDate = song.created_at.split(" ")
                const dateAdded = `${splitDate[2]} ${splitDate[1]}, ${splitDate[3]}`
                return <ul>
                    <li>
                        <img onClick={() => { setSelectedSong(song); console.log(selectedSong.song_URL) }} src={song.albumCover_URL} />
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
                    {user.id == song.userId && <div>
                        <div onClick={() => history.push(`/songs/${song.id}/edit`)}>Edit</div>
                        <div onClick={() => deleteSong(song.id, song.song_s3Name)}>Delete</div>
                    </div>}
                </ul>
            })}
            <h1>Logged-in user's playlists</h1>
            {userPlaylistsArr && userPlaylistsArr.map((playlist) => {
                return <ul>
                    <li>
                        <div>{playlist.title}</div>
                    </li>
                </ul>
            })} */}
            <AudioPlayer
                className="audioPlayer"
                // autoPlay
                layout="stacked-reverse"
                showSkipControls={true}
                showJumpControls={false}
                customAdditionalControls={[]}
                src={selectedSong.song_URL}
            // onPlay={e => console.log("onPlay")}
            // other props here
            />
        </>
    );
}

export default Home;