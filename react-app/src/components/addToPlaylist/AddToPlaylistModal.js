import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import '../editPlaylist/EditPlaylistModal.css';
import { authenticate } from '../../store/session';
import * as playlistStore from '../../store/playlist';


const AddToPlaylistModal = ({ songToAdd, setSongToAdd }) => {
    const [errors, setErrors] = useState([]);
    const [librarySelected, setLibrarySelected] = useState(false);
    const [playlistToAdd, setPlaylistToAdd] = useState('');
    const allPlaylists = useSelector((state) => state.playlistReducer.allPlaylists);
    const user = useSelector(state => state.sessionReducer.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const userPlaylists = allPlaylists?.filter((playlist) => playlist.userId === user.id);
    let userPlaylistsList;
    if (userPlaylists) userPlaylistsList = Object.values(userPlaylists)

    const addToPlaylist = async (playlistId, songId) => {
        const userId = user.id;
        const validationErrors = [];

        if (!librarySelected && !playlistToAdd) {
            validationErrors.push("Please select a playlist");
        }
        setErrors(validationErrors);

        if (!validationErrors.length) {
            if (librarySelected) {
                await dispatch(playlistStore.thunk_addToLibrary({ userId, songId }));
                await dispatch(authenticate());
                setLibrarySelected(false);
            } else {
                await dispatch(playlistStore.thunk_addToPlaylist({ playlistId, songId }))
            }
            setSongToAdd('');
            setPlaylistToAdd('');
        } else {
            history.push('/');
        }
    };


    return (
        <div className="modal_background">
            <div className="modal_container">
                <div className="modal_logoClose_container">
                    <div className="form_logo">
                        <div className="formLogo_circle"><i id="formLogo_headphones" className="fas fa-headphones"></i></div>Jamify
                    </div>
                    <i onClick={() => { setPlaylistToAdd(''); setSongToAdd(''); }} className="fas fa-window-close"></i>
                </div>
                <div className="form_headerText">Choose Playlist</div>

                {errors && <div className="error-container">
                    {errors.map((error, i) => (
                        <div className="error-message" key={i}>{error}</div>
                    ))}
                </div>}
                
                <ul className="addSong_dropdown">
                    {librarySelected === true ?
                        <li id="addSong_selected" onClick={() => { setLibrarySelected(true); setPlaylistToAdd(''); }} >Your Library</li> :
                        <li onClick={() => { setLibrarySelected(true); setPlaylistToAdd(''); }} >Your Library</li>}
                    {userPlaylistsList && userPlaylistsList.map((playlist, index) => {
                        return playlistToAdd === playlist.id ?
                            <li key={index} id="addSong_selected" onClick={() => { setPlaylistToAdd(playlist.id); setLibrarySelected(false); }} >{playlist.title}</li> :
                            <li key={index} onClick={() => { setPlaylistToAdd(playlist.id); setLibrarySelected(false); }} >{playlist.title}</li>
                    })}
                </ul>
                <div className="dividerLine"></div>
                <button onClick={() => addToPlaylist(playlistToAdd, songToAdd)} className="form_submitButton">Add Song</button>
            </div>
        </div>
    )
};

export default AddToPlaylistModal;
