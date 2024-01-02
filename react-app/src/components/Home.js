import React, { useState, useEffect, createRef } from 'react';
import S3 from 'react-aws-s3';
import AudioPlayer from 'react-h5-audio-player';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import 'react-h5-audio-player/lib/styles.css';
import './Home.css';
import AddToPlaylistModal from './addToPlaylist/AddToPlaylistModal';
import CreatePlaylistModal from './createPlaylist/CreatePlaylistModal';
import EditPlaylistModal from './editPlaylist/EditPlaylistModal';
import EditSongModal from './editSong/EditSongModal';
import UploadSongModal from './uploadSong/UploadSongModal';
import { authenticate, logout } from '../store/session';
import * as songStore from '../store/song';
import * as playlistStore from '../store/playlist';

function Home() {
    const user = useSelector((state) => state.sessionReducer.user);
    const userId = user.id;
    const allSongs = useSelector((state) => state.songReducer.allSongs);
    const allPlaylists = useSelector((state) => state.playlistReducer.allPlaylists);
    const userPlaylists = allPlaylists?.filter((playlist) => playlist.userId === user.id);
    const player = createRef();
    const dispatch = useDispatch();
    const history = useHistory();

    // State variables
    const [createPlaylist, setCreatePlaylist] = useState(false);
    const [currentPage, setCurrentPage] = useState('Home');
    const [editSong, setEditSong] = useState('');
    const [librarySelected, setLibrarySelected] = useState(false);
    const [likesSelected, setLikesSelected] = useState(false);
    const [playlistToEdit, setPlaylistToEdit] = useState('');
    const [profileButtonDropdown, setProfileButtonDropdown] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPlaylist, setSelectedPlaylist] = useState('');
    const [selectedSong, setSelectedSong] = useState('');
    const [songToAdd, setSongToAdd] = useState('');
    const [sort, setSort] = useState('');
    const [sortOrder, setSortOrder] = useState('ASC');
    const [shuffleSelected, setShuffleSelected] = useState(false);
    const [uploadSong, setUploadSong] = useState(false)

    const genresArr = [
        "Ambient",
        "Blues",
        "Country",
        "Dance",
        "Electronic",
        "Experimental",
        "Folk",
        "Funk",
        "Hip-Hop",
        "Indie-Rock",
        "Jazz",
        "Metal",
        "Pop",
        "Punk",
        "R&B",
        "Rock",
        "Shoegaze",
        "Soul"
    ];

    let allSongsArr;
    let selectedPlaylistDetails;

    const searchFilter = (arr, keyword) => {
        return arr.filter(song => {
            if (song.title.toLowerCase().includes(keyword.toLocaleLowerCase()) ||
                song.artist.toLowerCase().includes(keyword.toLocaleLowerCase()) ||
                song.album.toLowerCase().includes(keyword.toLocaleLowerCase()) ||
                song.genre.toLowerCase().includes(keyword.toLocaleLowerCase())) {
                return song;
            }
            return null;
        })
    };

    // ----- Filtering and Sorting songs -----

    if (allSongs) {
        // Gather songs for whichever tab is selected
        if (selectedPlaylist) { // Any playlist
            allSongsArr = userPlaylists.filter((playlist) => playlist?.id === selectedPlaylist)[0]?.songs;
            selectedPlaylistDetails = allPlaylists?.filter(playlist => playlist?.id === selectedPlaylist)[0];
        } else if (librarySelected) { // Library
            const allSongsSet = new Set();
            user.library.forEach(librarySong => {
                allSongsSet.add(allSongs.filter(song => song.id === librarySong.songId)[0]);
            })
            allSongsArr = Array.from(allSongsSet);
        } else if (likesSelected) { // Likes
            allSongsArr = [];
            user.likes.forEach(likedSong => {
                allSongsArr.push(allSongs.filter(song => song.id === likedSong.songId)[0]);
            })
        } else { // Home
            allSongsArr = Object.values(allSongs);
        }

        // Filter songs if a search term has been entered
        if (searchTerm.length > 0) allSongsArr = searchFilter(allSongsArr, searchTerm);

        // Sort songs
        if (sortOrder === "ASC" && sort) {
            allSongsArr = allSongsArr.slice().sort((a, b) => a[sort] < b[sort] ? -1 : 1);
        }

        if (sortOrder === "DESC") {
            if (sort) {
                allSongsArr = allSongsArr.slice().sort((a, b) => a[sort] > b[sort] ? -1 : 1);
            } else {
                allSongsArr = [...allSongsArr].reverse(); // No sort is selected but the user toggled the caret to DESC
            }
        }
    }

    let userPlaylistsArr;
    if (userPlaylists) userPlaylistsArr = Object.values(userPlaylists)

    const s3envKey = process.env.REACT_APP_AWS_KEY;
    const s3envSecretKey = process.env.REACT_APP_AWS_SECRET_KEY;
    const config = {
        bucketName: 'jamify',
        region: 'us-west-2',
        accessKeyId: s3envKey,
        secretAccessKey: s3envSecretKey,
    }
    const ReactS3Client = new S3(config);

    const randomIntFromInterval = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // Play next song in current playlist
    const playNextSong = () => {
        if (shuffleSelected) {
            let currentSongIndex;
            for (let i = 0; i < allSongsArr.length; i++) {
                if (selectedSong === allSongsArr[i]) {
                    currentSongIndex = i;
                    break;
                }
            }
            let randomInt = currentSongIndex;
            while (allSongsArr.length > 1 && randomInt === currentSongIndex) {
                randomInt = randomIntFromInterval(0, allSongsArr.length - 1);
            }
            setSelectedSong(allSongsArr[randomInt]);
            return;
        }

        for (let i = 0; i < allSongsArr.length; i++) {
            if (allSongsArr[i].id === selectedSong.id) {
                const nextI = allSongsArr[i + 1] ? i + 1 : 0;
                setSelectedSong(allSongsArr[nextI]);
                return;
            }
        }
    }

    // Play previous song in current playlist
    const playPreviousSong = () => {
        if (shuffleSelected) {
            let currentSongIndex;
            for (let i = 0; i < allSongsArr.length; i++) {
                if (selectedSong === allSongsArr[i]) {
                    currentSongIndex = i;
                    break;
                }
            }
            let randomInt = currentSongIndex;
            while (allSongsArr.length > 1 && randomInt === currentSongIndex) {
                randomInt = randomIntFromInterval(0, allSongsArr.length - 1);
            }
            setSelectedSong(allSongsArr[randomInt]);
            return;
        }

        for (let i = 0; i < allSongsArr.length; i++) {
            if (allSongsArr[i].id === selectedSong.id) {
                const nextI = allSongsArr[i - 1] ? i - 1 : allSongsArr.length - 1;
                setSelectedSong(allSongsArr[nextI]);
                return;
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
        await dispatch(authenticate());
    };

    // Remove song from playlist
    const removeFromPlaylist = async (playlistId, songId) => {
        await dispatch(playlistStore.thunk_removeFromPlaylist({ playlistId, songId }));
    };

    // Remove song from library
    const removeFromLibrary = async (songId, userId) => {
        await dispatch(playlistStore.thunk_removeFromLibrary({ songId, userId }));
        await dispatch(authenticate());
    };

    // Delete playlist
    const deletePlaylist = async (playlistId) => {
        setSelectedPlaylist('');
        setCurrentPage('Home');

        await dispatch(playlistStore.thunk_deletePlaylist({ playlistId }));
        await dispatch(authenticate());
    };

    const onLogout = async (e) => {
        await dispatch(logout());
    };

    useEffect(() => {
        dispatch(songStore.thunk_getAllSongs()); // Get songs
        dispatch(playlistStore.thunk_getAllPlaylists()); // Get playlists
    }, [dispatch]);

    return (
        <>
            {/* ----- Upload song modal ----- */}
            {uploadSong && <UploadSongModal genresArr={genresArr} setUploadSong={setUploadSong} />}
            {/* ----- Edit song modal ----- */}
            {editSong && <EditSongModal genresArr={genresArr} editSong={editSong} setEditSong={setEditSong} />}
            {/* ----- Create playlist details modal ----- */}
            {createPlaylist && <CreatePlaylistModal setCreatePlaylist={setCreatePlaylist} />}
            {/* ----- Add song to playlist modal ----- */}
            {songToAdd && <AddToPlaylistModal songToAdd={songToAdd} setSongToAdd={setSongToAdd} setSelectedPlaylist={setSelectedPlaylist} />}
            {/* ----- Edit playlist details modal ----- */}
            {playlistToEdit && <EditPlaylistModal playlistToEdit={playlistToEdit} setPlaylistToEdit={setPlaylistToEdit} />}

            <div className="page_container">

                {/* ----- Navigation section of sidebar ----- */}

                <div className="sidebar">
                    <div className="sideNav_container">
                        <ul>
                            <li onClick={() => { history.push(`/`); setSelectedPlaylist(''); setLibrarySelected(false); setLikesSelected(false); setSearchTerm(''); setCurrentPage('Home') }}><i className="fas fa-home sideBar_icon"></i><div className="sidebarItem_title">Home</div></li>
                            <li onClick={() => { setLikesSelected(true); setSelectedPlaylist(''); setLibrarySelected(false); setSearchTerm(''); setCurrentPage('LikedSongs') }}><i className="fas fa-heart sideBar_icon"></i><div className="sidebarItem_title">Liked Songs</div></li>
                            <li onClick={() => { setLibrarySelected(true); setLikesSelected(false); setSelectedPlaylist(''); setSearchTerm(''); setCurrentPage('YourLibrary') }}><i className="fas fa-book sideBar_icon"></i><div className="sidebarItem_title">Your Library</div></li>
                        </ul>
                    </div>
                    <div className="sideForm_container">
                        <ul>
                            <li onClick={() => setCreatePlaylist(true)}><i className="fas fa-plus sideBar_icon"></i><div className="sidebarItem_title">Create Playlist</div></li>
                            <li onClick={() => setUploadSong(true)}><i className="fas fa-cloud-upload-alt sideBar_icon"></i><div className="sidebarItem_title">Upload Song</div></li>
                        </ul>
                    </div>

                    {/* ----- Playlist section of sidebar ----- */}

                    <div className="playlist_container">
                        <ul>
                            {userPlaylistsArr && userPlaylistsArr.map((playlist) => (
                                <li key={playlist.id} className="sideBar_playlist_container">
                                    <div className="sideBar_playlistTitle" onClick={() => { setSelectedPlaylist(playlist.id); setLibrarySelected(false); setLikesSelected(false); setSearchTerm(''); setCurrentPage('Playlist') }}>{playlist.title}</div>
                                    <div className="sideBar_playlistTitle_small" onClick={() => { setSelectedPlaylist(playlist.id); setLibrarySelected(false); setLikesSelected(false); setSearchTerm(''); setCurrentPage('Playlist') }}>{`${playlist.title.slice(0, 2)}...`}</div>
                                    <div className="sideBar_edit_delete_container">
                                        <div onClick={() => setPlaylistToEdit(playlist.id)}><i className="fas fa-edit"></i></div>
                                        <div onClick={() => deletePlaylist(playlist.id)}><i className="fas fa-trash-alt"></i></div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* ----- Banner ----- */}

                <div className="banner_home">

                    {/* Home banner */}
                    {currentPage === 'Home' && <div className="logo_welcomeMessage_container">
                        <div className="banner_logo">
                            <div className="bannerLogo_circle"><i className="fas fa-headphones"></i></div>Jamify
                        </div>
                        <div id="mainText_row" className="banner_mainText">Welcome, {user?.username}</div>
                        <div id="banner_mainText_columnTop" className="banner_mainText_column">Welcome,</div>
                        <div id="banner_mainText_columnBottom" className="banner_mainText_column">{user?.username}</div>
                    </div>}

                    {/* Library banner */}
                    {currentPage === 'YourLibrary' && <div className="banner_playlistDetails">
                        <div className="banner_yourLibraryImage"><div className="yourLibraryImage_book"><i className="fas fa-book"></i></div></div>
                        <ul className="playlistDetails_list">
                            <li id="playlistDetails_title">Your Library</li>
                            <li id="playlistDetails_username">{user.username}<span> • {allSongsArr.length} songs</span></li>
                        </ul>
                    </div>}

                    {/* Likes banner */}
                    {currentPage === 'LikedSongs' && <div className="banner_playlistDetails">
                        <div className="banner_likedSongsImage"><div className="likedSongsImage_heart"><i className="fas fa-heart"></i></div></div>
                        <ul className="playlistDetails_list">
                            <li id="playlistDetails_playlist">PLAYLIST</li>
                            <li id="playlistDetails_title">Liked Songs</li>
                            <li id="playlistDetails_username">{user.username}<span> • {allSongsArr.length} songs</span></li>
                        </ul>
                    </div>}

                    {/* Playlist banner */}
                    {currentPage === 'Playlist' && <div className="banner_playlistDetails">
                        {selectedPlaylistDetails.coverPhoto_URL ? <img className="banner_playlistImage" alt="" src={selectedPlaylistDetails.coverPhoto_URL}></img> : <img className="banner_playlistImage" alt="" src="https://jamify.s3.us-west-2.amazonaws.com/utils/Music_note.png"></img>}
                        <ul className="playlistDetails_list">
                            <li id="playlistDetails_playlist">PLAYLIST</li>
                            <li id="playlistDetails_title">{selectedPlaylistDetails?.title}</li>
                            <li id="playlistDetails_username">{user.username}<span> • {selectedPlaylistDetails?.songs.length} songs</span></li>
                        </ul>
                    </div>}

                    {/* Profile dropdown */}
                    <button onClick={() => setProfileButtonDropdown(!profileButtonDropdown)} className="profileButton">
                        <img alt="" src={user.photo_URL} className="profileButton_thumbnail" />
                        <div className="profileButton_username">{user?.username}</div>
                        {profileButtonDropdown ? <i className="fas fa-caret-up"></i> : <i className="fas fa-caret-down"></i>}
                        {profileButtonDropdown && <ul className="profileButton_dropdown">
                            <i className="fas fa-caret-up dropdownCaret"></i>
                            <li onClick={onLogout}>Log Out</li>
                        </ul>}
                    </button>

                    {/* ----- Song feed ----- */}
                    <div className="song_container">
                        {currentPage === "Home" && <p id="browseSongs_text">Browse all songs</p>}

                        <div className="search_sort_container">

                            {/* ----- Search box ----- */}
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

                            {/* ----- Sort dropdown ----- */}
                            <select className="sort_dropdown" onChange={(e) => setSort(e.target.value)}>
                                <option selected disabled hidden>Sort</option>
                                <option value=''>#</option>
                                <option value='title'>Title</option>
                                <option value='artist'>Artist</option>
                                <option value='album'>Album</option>
                                <option value='genre'>Genre</option>
                            </select>
                        </div>

                        {/* ----- Song feed headers row ----- */}
                        <ul className="playlist_header">
                            <li id="index_header">#</li>
                            <li id="title_header">TITLE
                                {sortOrder === 'DESC' ?
                                    <i onClick={() => setSortOrder('ASC')} id="sortOrder_caret" className="fas fa-caret-up"></i> :
                                    <i onClick={() => setSortOrder('DESC')} id="sortOrder_caret" className="fas fa-caret-down sortOrder_caret"></i>
                                }
                            </li>
                            <li id="album_header">ALBUM</li>
                            <li id="dateAdded_header">DATE ADDED</li>
                            <li id="genre_header">GENRE</li>
                        </ul>

                        {/* ----- Song feed song rows ----- */}
                        {allSongsArr && allSongsArr.map((song, index) => {

                            let splitDate;
                            let dateAdded;
                            if (song) {
                                splitDate = song.created_at.split(" ")
                                dateAdded = `${splitDate[2]} ${splitDate[1]}, ${splitDate[3]}`
                            }

                            return <ul key={index} className="playlist_row">

                                {/* ----- Index ----- */}
                                <li className="index_column">{index + 1}</li>

                                {/* ----- Title ----- */}
                                <li className="titleAndButtons_container" id="titleAndButtons_container_phone">
                                    <div onClick={() => setSelectedSong(song)} className="playlistTitle_container">
                                        <img alt="" className="albumCover_thumbnail" src={song?.albumCover_URL}></img>
                                        <div>
                                            {selectedSong !== song && <div className="playlist_songTitle">{song?.title}</div>}
                                            {selectedSong === song && <div className="playlist_songTitle_selected">{song?.title}</div>}
                                            <div>{song?.artist}</div>
                                        </div>
                                    </div>
                                    {<div className="edit_delete_container">
                                        {user.id === song?.userId && <div onClick={() => setEditSong(song?.id)}><i className="fas fa-edit"></i></div>}
                                        {user.id === song?.userId && <div onClick={() => deleteSong(song?.id, song?.song_s3Name)}><i className="fas fa-trash-alt"></i></div>}
                                        <div id="likeAndAdd_container_title">
                                            {!selectedPlaylist && !librarySelected && <div onClick={() => setSongToAdd(song?.id)}><i className="fas fa-plus"></i></div>}
                                            {selectedPlaylist && <div onClick={() => removeFromPlaylist(selectedPlaylist, song?.id)}><i className="fas fa-minus"></i></div>}
                                            {librarySelected && <div onClick={() => removeFromLibrary(song?.id, userId)}><i className="fas fa-minus"></i></div>}
                                            {user.likes.map(like => like?.songId).includes(song?.id) ? <div onClick={() => likeSong(song?.id)}><i id="likedSong" className="fas fa-heart"></i></div> : <div onClick={() => likeSong(song?.id)}><i className="fas fa-heart"></i></div>}
                                        </div>
                                    </div>}
                                </li>

                                {/* ----- Album ----- */}
                                <li className="album_column">
                                    {song?.album}
                                    <div id="likeAndAdd_container_hidden">
                                        {!selectedPlaylist && !librarySelected && <div onClick={() => setSongToAdd(song?.id)}><i className="fas fa-plus"></i></div>}
                                        {selectedPlaylist && <div onClick={() => removeFromPlaylist(selectedPlaylist, song?.id)}><i className="fas fa-minus"></i></div>}
                                        {librarySelected && <div onClick={() => removeFromLibrary(song?.id, userId)}><i className="fas fa-minus"></i></div>}
                                        {user.likes.map(like => like?.songId).includes(song?.id) ? <div onClick={() => likeSong(song?.id)}><i id="likedSong" className="fas fa-heart"></i></div> : <div onClick={() => likeSong(song?.id)}><i className="fas fa-heart"></i></div>}
                                    </div>
                                </li>

                                {/* ----- Date ----- */}
                                <li id="dateAdded_column" className="playlistDate_container">
                                    {dateAdded}
                                    <div className="likeAndAdd_container">
                                        {!selectedPlaylist && !librarySelected && <div onClick={() => setSongToAdd(song?.id)}><i className="fas fa-plus"></i></div>}
                                        {selectedPlaylist && <div onClick={() => removeFromPlaylist(selectedPlaylist, song?.id)}><i className="fas fa-minus"></i></div>}
                                        {librarySelected && <div onClick={() => removeFromLibrary(song?.id, userId)}><i className="fas fa-minus"></i></div>}
                                        {user.likes.map(like => like?.songId).includes(song?.id) ? <div onClick={() => likeSong(song?.id)}><i id="likedSong" className="fas fa-heart"></i></div> : <div onClick={() => likeSong(song?.id)}><i className="fas fa-heart"></i></div>}
                                    </div>
                                </li>

                                {/* ----- Genre ----- */}
                                <li className="genre_column">{song?.genre}</li>
                            </ul>
                        })}
                    </div>

                </div>
            </div>

            {/* ----- Audio player ----- */}
            {selectedSong && <div id="audioPlayer_songInfo" className="playlistTitle_container">
                <div id="audioPlayer_thumbnail_wrapper" className="audioPlayer_thumbnail_wrapper">
                    <img id="audioPlayer_thumbnail" className="albumCover_thumbnail" alt="" src={selectedSong.albumCover_URL}></img>
                    <div className="audioPlayer_songTitle_artist">
                        <div id="audioPlayer_songTitle" className="playlist_songTitle">{selectedSong.title}</div>
                        <div id="audioPlayer_artist">{selectedSong.artist}</div>
                    </div>
                </div>
                {user.likes.map(like => like?.songId).includes(selectedSong.id) ? <div onClick={() => likeSong(selectedSong.id)}><i id="likedSong" className="fas fa-heart"></i></div> : <div onClick={() => likeSong(selectedSong.id)}><i className="fas fa-heart"></i></div>}
            </div>}
            <div id="shuffle_container" onClick={() => setShuffleSelected(!shuffleSelected)}>
                {shuffleSelected ? <i id="shuffle_selected" className="fas fa-random shuffle_icon"></i> : <i className="fas fa-random shuffle_icon"></i>}
            </div>
            <AudioPlayer
                className="audioPlayer"
                layout="stacked-reverse"
                showSkipControls={true}
                showJumpControls={false}
                ref={player}
                onEnded={e => playNextSong()}
                onClickPrevious={e => playPreviousSong()}
                onClickNext={e => playNextSong()}
                src={selectedSong.song_URL}
            />
        </>
    );
}

export default Home;