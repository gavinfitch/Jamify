import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { useParams } from "react-router"
import { useHistory } from 'react-router-dom';
import '../editPlaylist/EditPlaylistModal.css';
import S3 from 'react-aws-s3';
import * as playlistStore from '../../store/playlist';

const AddToPlaylistModal = ({ songToAdd, setSongToAdd, setSelectedPlaylist }) => {
    const [errors, setErrors] = useState([]);
    const user = useSelector(state => state.sessionReducer.user);
    const allPlaylists = useSelector((state) => state.playlistReducer.allPlaylists)
    const userPlaylists = allPlaylists?.filter((playlist) => playlist.userId = user.id)

    let userPlaylistsArr;
    if (userPlaylists) {
        userPlaylistsArr = Object.values(userPlaylists)
    }
    // const currentPlaylist = allPlaylists?.filter((playlist) => playlist.id == playlistToEdit)[0]

    const [playlistToAdd, setPlaylistToAdd] = useState('');

    const dispatch = useDispatch()
    const history = useHistory()

    // const [title, setTitle] = useState(currentPlaylist?.title);
    // const [coverPhoto, setCoverPhoto] = useState('')
    // const [coverPhoto_title, setCoverPhoto_title] = useState('')


    const addToPlaylist = async (playlistId, songId) => {
        await dispatch(playlistStore.thunk_addToPlaylist({ playlistId, songId }))
        setSongToAdd('')
        setPlaylistToAdd('')
        setSelectedPlaylist(playlistId)
    };

    return (
        <div className="modal_background">
            <div className="modal_container">
                <div className="modal_logoClose_container">
                    <div className="form_logo">
                        <div className="formLogo_circle"><i id="formLogo_headphones" class="fas fa-headphones"></i></div>Jamify
                    </div>
                    <i onClick={() => { setPlaylistToAdd(''); setSongToAdd('') }} class="fas fa-window-close"></i>
                </div>
                <div className="form_headerText">Choose Playlist</div>
                <ul className="addSong_dropdown">
                    {userPlaylistsArr && userPlaylistsArr.map(playlist => {
                        return playlistToAdd == playlist.id ? <li id="addSong_selected" onClick={() => setPlaylistToAdd(playlist.id)} >{playlist.title}</li> : <li onClick={() => setPlaylistToAdd(playlist.id)} >{playlist.title}</li>
                    })}
                </ul>
                <div className="dividerLine"></div>
                <button onClick={() => addToPlaylist(playlistToAdd, songToAdd)} className="form_submitButton">Add Song</button>
            </div>
        </div>
    )
};

export default AddToPlaylistModal;