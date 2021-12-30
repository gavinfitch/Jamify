import React, { useState, useEffect, createRef } from 'react';
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
import { authenticate, logout } from '../store/session';
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
    const [shuffleSelected, setShuffleSelected] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [songToAdd, setSongToAdd] = useState('');
    const [playlistToAdd, setPlaylistToAdd] = useState('');
    const [playlistToEdit, setPlaylistToEdit] = useState('');
    const [createPlaylist, setCreatePlaylist] = useState(false);
    const [uploadSong, setUploadSong] = useState(false)
    const [editSong, setEditSong] = useState('')
    const [currentPage, setCurrentPage] = useState('Home')
    const [profileButtonDropdown, setProfileButtonDropdown] = useState(false)

    const [title, setTitle] = useState('');
    const [coverPhoto, setCoverPhoto] = useState('')
    const [coverPhoto_title, setCoverPhoto_title] = useState('')

    const player = createRef()

    const genresArr = ["Ambient", "Blues", "Country", "Dance", "Electronic", "Experimental", "Folk", "Funk", "Hip-Hop", "Indie-Rock", "Jazz", "Metal", "Pop", "Punk", "R&B", "Rock", "Shoegaze", "Soul"]

    let allSongsArr;
    let selectedPlaylistDetails;

    const searchFilter = (arr, keyword) => {
        return arr.filter(song => {
            if (song.title.toLowerCase().includes(keyword.toLocaleLowerCase())) {
                return song;
            } else if (song.artist.toLowerCase().includes(keyword.toLocaleLowerCase())) {
                return song;
            } else if (song.album.toLowerCase().includes(keyword.toLocaleLowerCase())) {
                return song;
            } else if (song.genre.toLowerCase().includes(keyword.toLocaleLowerCase())) {
                return song;
            }
        })
    }

    if (allSongs) {
        if (selectedPlaylist) {

            allSongsArr = userPlaylists.filter((playlist) => playlist?.id == selectedPlaylist)[0]?.songs
            selectedPlaylistDetails = allPlaylists?.filter(playlist => playlist?.id == selectedPlaylist)[0]

            if (searchTerm.length > 0) {
                allSongsArr = searchFilter(allSongsArr, searchTerm)
            }

        } else if (librarySelected) {
            let allSongsSet = new Set();
            user.library.forEach(librarySong => {
                allSongsSet.add(allSongs.filter(song => song.id == librarySong.songId)[0])
            })
            allSongsArr = Array.from(allSongsSet)
            // allSongsArr = allSongs.filter((song) => user.library.map(library_song => library_song.songId).includes(song.id));
            if (searchTerm.length > 0) {
                allSongsArr = searchFilter(allSongsArr, searchTerm)
            }
        } else if (likesSelected) {
            allSongsArr = [];
            user.likes.forEach(likedSong => {
                allSongsArr.push(allSongs.filter(song => song.id == likedSong.songId)[0])
            })
            // allSongsArr = allSongs.filter((song) => user.likes.map(like => like.songId).includes(song.id));

            if (searchTerm.length > 0) {
                allSongsArr = searchFilter(allSongsArr, searchTerm)
            }
        } else {
            allSongsArr = Object.values(allSongs)

            if (searchTerm.length > 0) {
                allSongsArr = searchFilter(allSongsArr, searchTerm)
            }
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


    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    // Play next song in current playlist
    const playNextSong = () => {
        if (shuffleSelected) {
            let currentSongIndex;
            for (let i = 0; i < allSongsArr.length; i++) {
                if (selectedSong == allSongsArr[i]) {
                    currentSongIndex = i;
                }
            }

            let randInt = currentSongIndex;
            while (allSongsArr.length > 1 && randInt == currentSongIndex) {
                randInt = randomIntFromInterval(0, allSongsArr.length - 1);
            }

            setSelectedSong(allSongsArr[randInt])
            return
        } else {
            for (let i = 0; i < allSongsArr.length; i++) {
                if (allSongsArr[i].id == selectedSong.id) {
                    if (allSongsArr[i + 1]) {
                        setSelectedSong(allSongsArr[i + 1]);
                        return
                    }
                }
            }
        }
    }

    // Play previous song in current playlist
    const playPreviousSong = () => {
        if (shuffleSelected) {
            let currentSongIndex;
            for (let i = 0; i < allSongsArr.length; i++) {
                if (selectedSong == allSongsArr[i]) {
                    currentSongIndex = i;
                }
            }

            let randInt = currentSongIndex;
            while (allSongsArr.length > 1 && randInt == currentSongIndex) {
                randInt = randomIntFromInterval(0, allSongsArr.length - 1);
            }

            setSelectedSong(allSongsArr[randInt])
            return
        } else {
            for (let i = 0; i < allSongsArr.length; i++) {
                if (allSongsArr[i].id == selectedSong.id) {
                    if (allSongsArr[i - 1]) {
                        setSelectedSong(allSongsArr[i - 1]);
                        return
                    }
                }
            }
        }
    }

    // Delete song
    const deleteSong = async (songId, song_s3Name) => {
        await ReactS3Client
            .deleteFile(song_s3Name)
            .then(response => console.log(response))
            .catch(err => console.error(err))

        await dispatch(songStore.thunk_deleteSong({ songId }));
        await dispatch(playlistStore.thunk_getAllPlaylists());
        await dispatch(authenticate());
    };

    // Like song
    const likeSong = async (songId) => {
        await dispatch(songStore.thunk_likeSong({ songId, userId }));
        await dispatch(authenticate())
    };

    // Remove song from playlist
    const removeFromPlaylist = async (playlistId, songId) => {
        await dispatch(playlistStore.thunk_removeFromPlaylist({ playlistId, songId }))
    };

    // Remove song from library
    const removeFromLibrary = async (songId, userId) => {
        await dispatch(playlistStore.thunk_removeFromLibrary({ songId, userId }))
        await dispatch(authenticate())
    };

    // Delete playlist
    const deletePlaylist = async (playlistId, coverPhoto_s3Name) => {
        setSelectedPlaylist('')
        setCurrentPage('Home')
        // await ReactS3Client
        //     .deleteFile(coverPhoto_s3Name)
        //     .then(response => console.log(response))
        //     .catch(err => console.error(err))
        await dispatch(playlistStore.thunk_deletePlaylist({ playlistId }))
    };

    const onLogout = async (e) => {
        await dispatch(logout());
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
                            <li onClick={() => { history.push(`/`); setSelectedPlaylist(''); setLibrarySelected(false); setLikesSelected(false); setSearchTerm(''); setCurrentPage('Home') }}><i class="fas fa-home sideBar_icon"></i><div className="sidebarItem_title">Home</div></li>
                            {/* <li><i class="fas fa-search sideBar_icon"></i>Search</li> */}
                            <li onClick={() => { setLikesSelected(true); setSelectedPlaylist(''); setLibrarySelected(false); setSearchTerm(''); setCurrentPage('LikedSongs') }}><i class="fas fa-heart sideBar_icon"></i><div className="sidebarItem_title">Liked Songs</div></li>
                            <li onClick={() => { setLibrarySelected(true); setLikesSelected(false); setSelectedPlaylist(''); setSearchTerm(''); setCurrentPage('YourLibrary') }}><i class="fas fa-book sideBar_icon"></i><div className="sidebarItem_title">Your Library</div></li>
                        </ul>
                    </div>
                    <div className="sideForm_container">
                        <ul>
                            <li onClick={() => setCreatePlaylist(true)}><i class="fas fa-plus sideBar_icon"></i><div className="sidebarItem_title">Create Playlist</div></li>
                            <li onClick={() => setUploadSong(true)}><i class="fas fa-cloud-upload-alt sideBar_icon"></i><div className="sidebarItem_title">Upload Song</div></li>
                        </ul>
                    </div>
                    {/* ----- Playlist section of sidebar ----- */}
                    <div className="playlist_container">
                        <ul>
                            {userPlaylistsArr && userPlaylistsArr.map((playlist) => {
                                console.log(`${playlist.title.slice(0, 2)}...`)
                                return <li className="sideBar_playlist_container">
                                    <div className="sideBar_playlistTitle" onClick={() => { setSelectedPlaylist(playlist.id); setLibrarySelected(false); setLikesSelected(false); setSearchTerm(''); setCurrentPage('Playlist') }}>{playlist.title}</div>
                                    <div className="sideBar_playlistTitle_small" onClick={() => { setSelectedPlaylist(playlist.id); setLibrarySelected(false); setLikesSelected(false); setSearchTerm(''); setCurrentPage('Playlist') }}>{`${playlist.title.slice(0, 2)}...`}</div>
                                    <div className="sideBar_edit_delete_container">
                                        <div onClick={() => setPlaylistToEdit(playlist.id)}><i class="fas fa-edit"></i></div>
                                        <div onClick={() => deletePlaylist(playlist.id, playlist.coverPhoto_s3Name)}><i class="fas fa-trash-alt"></i></div>
                                    </div>
                                </li>
                            })}
                        </ul>
                    </div>
                </div>
                {/* ----- Banner ----- */}

                <div className="banner_home">
                    {currentPage == 'Home' && <div className="logo_welcomeMessage_container">
                        <div className="banner_logo">
                            <div className="bannerLogo_circle"><i class="fas fa-headphones"></i></div>Jamify
                        </div>
                        <div id="mainText_row" className="banner_mainText">Welcome, {user?.username}</div>
                        <div id="banner_mainText_columnTop" className="banner_mainText_column">Welcome,</div>
                        <div id="banner_mainText_columnBottom" className="banner_mainText_column">{user?.username}</div>
                    </div>}

                    {currentPage == 'Playlist' && <div className="banner_playlistDetails">
                        {selectedPlaylistDetails.coverPhoto_URL ? <img className="banner_playlistImage" src={selectedPlaylistDetails.coverPhoto_URL}></img> : <img className="banner_playlistImage" src="https://jamify.s3.us-west-2.amazonaws.com/utils/Music_note.png"></img>}
                        <ul className="playlistDetails_list">
                            <li id="playlistDetails_playlist">PLAYLIST</li>
                            <li id="playlistDetails_title">{selectedPlaylistDetails?.title}</li>
                            <li id="playlistDetails_username">{user.username}<span> • {selectedPlaylistDetails?.songs.length} songs</span></li>
                        </ul>
                    </div>}

                    {currentPage == 'YourLibrary' && <div className="banner_playlistDetails">
                        <div className="banner_yourLibraryImage"><div className="yourLibraryImage_book"><i class="fas fa-book"></i></div></div>
                        <ul className="playlistDetails_list">
                            <li id="playlistDetails_title">Your Library</li>
                            <li id="playlistDetails_username">{user.username}<span> • {allSongsArr.length} songs</span></li>
                        </ul>
                    </div>}

                    {currentPage == 'LikedSongs' && <div className="banner_playlistDetails">
                        <div className="banner_likedSongsImage"><div className="likedSongsImage_heart"><i class="fas fa-heart"></i></div></div>
                        <ul className="playlistDetails_list">
                            <li id="playlistDetails_playlist">PLAYLIST</li>
                            <li id="playlistDetails_title">Liked Songs</li>
                            <li id="playlistDetails_username">{user.username}<span> • {allSongsArr.length} songs</span></li>
                        </ul>
                    </div>}

                    <button onClick={() => setProfileButtonDropdown(!profileButtonDropdown)} className="profileButton">
                        <img src={user.photo_URL} className="profileButton_thumbnail" />
                        <div className="profileButton_username">{user?.username}</div>
                        {profileButtonDropdown ? <i class="fas fa-caret-up"></i> : <i class="fas fa-caret-down"></i>}
                        {profileButtonDropdown && <ul className="profileButton_dropdown">
                            <i class="fas fa-caret-up dropdownCaret"></i>
                            <li onClick={onLogout}>Log Out</li>
                        </ul>}
                    </button>
                    {/* ----- Song feed (playlist) ----- */}
                    <div className="song_container">
                        {currentPage == "Home" && <p id="browseSongs_text">Browse all songs</p>}
                        <div className="search_container">
                            <div className="magnifyingGlass_container">
                                <i className="fas fa-search"></i>
                            </div>
                            <input
                                className="search_box"
                                type="text"
                                placeholder="Search songs..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                }}
                            ></input>
                        </div>
                        <ul className="playlist_header">
                            <li id="index_header">#</li>
                            <li id="title_header">TITLE</li>
                            <li id="album_header">ALBUM</li>
                            <li id="dateAdded_header">DATE ADDED</li>
                            <li id="genre_header">GENRE</li>
                        </ul>
                        {allSongsArr && allSongsArr.map((song, index) => {

                            let splitDate;
                            let dateAdded;

                            if (song) {
                                splitDate = song.created_at.split(" ")
                                dateAdded = `${splitDate[2]} ${splitDate[1]}, ${splitDate[3]}`
                            }

                            return <ul className="playlist_row">
                                <li className="index_column">{index + 1}</li>
                                {/* <li className="index_column">100</li> */}
                                <li className="titleAndButtons_container" id="titleAndButtons_container_phone">
                                    <div onClick={() => setSelectedSong(song)} className="playlistTitle_container">
                                        <img className="albumCover_thumbnail" src={song?.albumCover_URL}></img>
                                        <div>
                                            {selectedSong != song && <div className="playlist_songTitle">{song?.title}</div>}
                                            {selectedSong == song && <div className="playlist_songTitle_selected">{song?.title}</div>}
                                            <div>{song?.artist}</div>
                                        </div>
                                    </div>
                                    {<div className="edit_delete_container">
                                        {user.id == song?.userId && <div onClick={() => setEditSong(song?.id)}><i class="fas fa-edit"></i></div>}
                                        {user.id == song?.userId && <div onClick={() => deleteSong(song?.id, song?.song_s3Name)}><i class="fas fa-trash-alt"></i></div>}
                                        <div id="likeAndAdd_container_title">
                                            {!selectedPlaylist && !librarySelected && <div onClick={() => setSongToAdd(song?.id)}><i class="fas fa-plus"></i></div>}
                                            {selectedPlaylist && <div onClick={() => removeFromPlaylist(selectedPlaylist, song?.id)}><i class="fas fa-minus"></i></div>}
                                            {librarySelected && <div onClick={() => removeFromLibrary(song?.id, userId)}><i class="fas fa-minus"></i></div>}
                                            {user.likes.map(like => like?.songId).includes(song?.id) ? <div onClick={() => likeSong(song?.id)}><i id="likedSong" class="fas fa-heart"></i></div> : <div onClick={() => likeSong(song?.id)}><i class="fas fa-heart"></i></div>}
                                        </div>
                                    </div>}
                                </li>
                                <li className="album_column">
                                    {song?.album}
                                    <div id="likeAndAdd_container_hidden">
                                        {!selectedPlaylist && !librarySelected && <div onClick={() => setSongToAdd(song?.id)}><i class="fas fa-plus"></i></div>}
                                        {selectedPlaylist && <div onClick={() => removeFromPlaylist(selectedPlaylist, song?.id)}><i class="fas fa-minus"></i></div>}
                                        {librarySelected && <div onClick={() => removeFromLibrary(song?.id, userId)}><i class="fas fa-minus"></i></div>}
                                        {user.likes.map(like => like?.songId).includes(song?.id) ? <div onClick={() => likeSong(song?.id)}><i id="likedSong" class="fas fa-heart"></i></div> : <div onClick={() => likeSong(song?.id)}><i class="fas fa-heart"></i></div>}
                                    </div>
                                </li>
                                <li id="dateAdded_column" className="playlistDate_container">
                                    {dateAdded}
                                    <div className="likeAndAdd_container">
                                        {!selectedPlaylist && !librarySelected && <div onClick={() => setSongToAdd(song?.id)}><i class="fas fa-plus"></i></div>}
                                        {selectedPlaylist && <div onClick={() => removeFromPlaylist(selectedPlaylist, song?.id)}><i class="fas fa-minus"></i></div>}
                                        {librarySelected && <div onClick={() => removeFromLibrary(song?.id, userId)}><i class="fas fa-minus"></i></div>}
                                        {user.likes.map(like => like?.songId).includes(song?.id) ? <div onClick={() => likeSong(song?.id)}><i id="likedSong" class="fas fa-heart"></i></div> : <div onClick={() => likeSong(song?.id)}><i class="fas fa-heart"></i></div>}
                                    </div>
                                </li>
                                <li className="genre_column">{song?.genre}</li>
                            </ul>
                        })}
                    </div>
                </div>

            </div>
            {/* ----- Audio player ----- */}
            {selectedSong && <div id="audioPlayer_songInfo" className="playlistTitle_container">
                <div id="audioPlayer_thumbnail_wrapper" className="audioPlayer_thumbnail_wrapper">
                    <img id="audioPlayer_thumbnail" className="albumCover_thumbnail" src={selectedSong.albumCover_URL}></img>
                    <div className="audioPlayer_songTitle_artist">
                        <div id="audioPlayer_songTitle" className="playlist_songTitle">{selectedSong.title}</div>
                        <div id="audioPlayer_artist">{selectedSong.artist}</div>
                    </div>
                </div>
                {user.likes.map(like => like?.songId).includes(selectedSong.id) ? <div onClick={() => likeSong(selectedSong.id)}><i id="likedSong" class="fas fa-heart"></i></div> : <div onClick={() => likeSong(selectedSong.id)}><i class="fas fa-heart"></i></div>}
            </div>}
            <div id="shuffle_container" onClick={() => setShuffleSelected(!shuffleSelected)}>
                {shuffleSelected ? <i id="shuffle_selected" class="fas fa-random shuffle_icon"></i> : <i class="fas fa-random shuffle_icon"></i>}
            </div>
            <AudioPlayer
                className="audioPlayer"
                // autoPlay
                layout="stacked-reverse"
                showSkipControls={true}
                showJumpControls={false}
                // customAdditionalControls={[LOOP]}
                ref={player}
                onEnded={e => playNextSong()}
                onClickPrevious={e => playPreviousSong()}
                onClickNext={e => playNextSong()}
                src={selectedSong.song_URL}
            // onPlay={e => console.log(player)}
            // other props here
            />
        </>
    );
}

export default Home;