import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import S3 from 'react-aws-s3';
import UploadSongModal from './uploadSong/UploadSongModal'
import EditSongModal from './editSong/EditSongModal'
import CreatePlaylistModal from './createPlaylist/CreatePlaylistModal'
import EditPlaylistModal from './editPlaylist/EditPlaylistModal'
import AddToPlaylistModal from './addToPlaylist/AddToPlaylistModal'
import { authenticate } from '../store/session';
import * as songStore from '../store/song';
import * as playlistStore from '../store/playlist';
import './Home.css';

function Home() {
    const user = useSelector((state) => state.sessionReducer.user);
    const userId = user.id;
    const allSongs = useSelector((state) => state.songReducer.allSongs)
    const allPlaylists = useSelector((state) => state.playlistReducer.allPlaylists)
    const userPlaylists = allPlaylists?.filter((playlist) => playlist.userId == user.id)

    const dispatch = useDispatch();
    const history = useHistory();

    const [selectedSong, setSelectedSong] = useState('');
    const [selectedPlaylist, setSelectedPlaylist] = useState('');
    const [librarySelected, setLibrarySelected] = useState(false);
    const [likesSelected, setLikesSelected] = useState(false);
    const [songToAdd, setSongToAdd] = useState('');
    const [playlistToAdd, setPlaylistToAdd] = useState('');
    const [playlistToEdit, setPlaylistToEdit] = useState('');
    const [createPlaylist, setCreatePlaylist] = useState(false);
    const [uploadSong, setUploadSong] = useState(false)
    const [editSong, setEditSong] = useState('')

    const [title, setTitle] = useState('');
    const [coverPhoto, setCoverPhoto] = useState('')
    const [coverPhoto_title, setCoverPhoto_title] = useState('')

    const genresArr = ["Ambient", "Blues", "Country", "Dance", "Electronic", "Experimental", "Folk", "Funk", "Hip-Hop", "Indie-Rock", "Jazz", "Metal", "Pop", "Punk", "R&B", "Rock", "Shoegaze", "Soul"]

    let allSongsArr;
    if (allSongs) {
        if (selectedPlaylist) {
            allSongsArr = userPlaylists.filter((playlist) => playlist.id == selectedPlaylist)[0]?.songs
        } else if (librarySelected) {
            allSongsArr = allSongs.filter((song) => user.library.map(library_song => library_song.songId).includes(song.id));
        } else if (likesSelected) {
            allSongsArr = allSongs.filter((song) => user.likes.map(like => like.songId).includes(song.id));
        } else {
            allSongsArr = Object.values(allSongs)
        }
    }

    let userPlaylistsArr;
    if (userPlaylists) {
        userPlaylistsArr = Object.values(userPlaylists)
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

    // Like post function
    const likeSong = async (songId) => {
        await dispatch(songStore.thunk_likeSong({ songId, userId }));
        await dispatch(authenticate())
    };

    const removeFromPlaylist = async (playlistId, songId) => {
        await dispatch(playlistStore.thunk_removeFromPlaylist({ playlistId, songId }))
    };

    const removeFromLibrary = async (songId, userId) => {
        await dispatch(playlistStore.thunk_removeFromLibrary({ songId, userId }))
        await dispatch(authenticate())
    };

    const deletePlaylist = async (playlistId, coverPhoto_s3Name) => {
        setSelectedPlaylist('')
        await ReactS3Client
            .deleteFile(coverPhoto_s3Name)
            .then(response => console.log(response))
            .catch(err => console.error(err))
        await dispatch(playlistStore.thunk_deletePlaylist({ playlistId }))
    };

    useEffect(() => {
        // Get all songs
        dispatch(songStore.thunk_getAllSongs());
        // Get all playlists
        dispatch(playlistStore.thunk_getAllPlaylists());
    }, [dispatch])

    return (
        <>
            {/* ----- Upload song modal ----- */}
            {uploadSong && < UploadSongModal genresArr={genresArr} setUploadSong={setUploadSong} />}
            {/* ----- edit song modal ----- */}
            {editSong && < EditSongModal genresArr={genresArr} editSong={editSong} setEditSong={setEditSong} />}
            {/* ----- Create playlist details modal ----- */}
            {createPlaylist && < CreatePlaylistModal setCreatePlaylist={setCreatePlaylist} />}
            {/* ----- Add song to playlist modal ----- */}
            {songToAdd && < AddToPlaylistModal songToAdd={songToAdd} setSongToAdd={setSongToAdd} setSelectedPlaylist={setSelectedPlaylist} />}
            {/* ----- Edit playlist details modal ----- */}
            {playlistToEdit && < EditPlaylistModal playlistToEdit={playlistToEdit} setPlaylistToEdit={setPlaylistToEdit} />}

            <div className="page_container">
                <div className="page_container"></div>
                {/* ----- Navigation section of sidebar ----- */}
                <div className="sidebar">
                    <div className="sideNav_container">
                        <ul>
                            <li onClick={() => { history.push(`/`); setSelectedPlaylist(''); setLibrarySelected(false); setLikesSelected(false) }}>Home</li>
                            <li>Search</li>
                            <li onClick={() => { setLibrarySelected(true); setLikesSelected(false); setSelectedPlaylist('') }}>Your Library</li>
                        </ul>
                    </div>
                    <div className="sideForm_container">
                        <ul>
                            <li onClick={() => setUploadSong(true)}>Upload Song</li>
                            <li onClick={() => setCreatePlaylist(true)}>Create Playlist</li>
                            <li onClick={() => { setLikesSelected(true); setSelectedPlaylist(''); setLibrarySelected(false) }}>Liked Songs</li>
                        </ul>
                    </div>
                    {/* ----- Playlist section of sidebar ----- */}
                    <div className="playlist_container">
                        <ul>
                            {userPlaylistsArr && userPlaylistsArr.map((playlist) => {
                                return <li className="sideBar_playlist_container">
                                    <div onClick={() => { setSelectedPlaylist(playlist.id); setLibrarySelected(false); setLikesSelected(false); }}>{playlist.title}</div>
                                    <div className="edit_delete_container">
                                        <div onClick={() => setPlaylistToEdit(playlist.id)}><i class="fas fa-edit"></i></div>
                                        <div onClick={() => deletePlaylist(playlist.id, playlist.coverPhoto_s3Name)}><i class="fas fa-trash-alt"></i></div>
                                    </div>
                                </li>
                            })}
                        </ul>
                    </div>
                </div>
                {/* ----- Banner ----- */}
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
                    {/* ----- Song feed (playlist) ----- */}
                    <div className="song_container">
                        <ul className="playlist_header">
                            <li>#</li>
                            <li>TITLE</li>
                            <li>ALBUM</li>
                            <li>DATE ADDED</li>
                            <li>GENRE</li>
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
                                        <div onClick={() => setEditSong(song.id)}><i class="fas fa-edit"></i></div>
                                        <div onClick={() => deleteSong(song.id, song.song_s3Name)}><i class="fas fa-trash-alt"></i></div>
                                    </div>}
                                </li>
                                <li>{song.album}</li>
                                <li className="playlistDate_container">
                                    {dateAdded}
                                    <div className="likeAndAdd_container">
                                        {!selectedPlaylist && !librarySelected && <div onClick={() => setSongToAdd(song.id)}><i class="fas fa-plus"></i></div>}
                                        {selectedPlaylist && <div onClick={() => removeFromPlaylist(selectedPlaylist, song.id)}><i class="fas fa-minus"></i></div>}
                                        {librarySelected && <div onClick={() => removeFromLibrary(song.id, userId)}><i class="fas fa-minus"></i></div>}
                                        {user.likes.map(like => like.songId).includes(song.id) ? <div onClick={() => likeSong(song.id)}><i id="likedSong" class="fas fa-heart"></i></div> : <div onClick={() => likeSong(song.id)}><i class="fas fa-heart"></i></div>}
                                    </div>
                                </li>
                                <li>{song.genre}</li>
                            </ul>
                        })}
                    </div>
                </div>
            </div>
            {/* ----- Audio player ----- */}
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