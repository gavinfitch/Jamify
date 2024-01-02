import React, { useState } from 'react';
import S3 from 'react-aws-s3';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './EditPlaylistModal.css';
import { authenticate } from '../../store/session';
import * as playlistStore from '../../store/playlist';


const EditPlaylistModal = ({ playlistToEdit, setPlaylistToEdit }) => {
    const user = useSelector(state => state.sessionReducer.user);
    const allPlaylists = useSelector((state) => state.playlistReducer.allPlaylists);
    const currentPlaylist = allPlaylists?.filter((playlist) => playlist.id === playlistToEdit)[0];
    const [coverPhoto, setCoverPhoto] = useState('');
    const [coverPhoto_title, setCoverPhoto_title] = useState('');
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState(currentPlaylist?.title);
    const dispatch = useDispatch();
    const history = useHistory();

    const s3envKey = process.env.REACT_APP_AWS_KEY;
    const s3envSecretKey = process.env.REACT_APP_AWS_SECRET_KEY;
    const config = {
        bucketName: "jamify",
        region: "us-west-2",
        accessKeyId: s3envKey,
        secretAccessKey: s3envSecretKey,
    };

    const ReactS3Client = new S3(config);

    const editPlaylist = async () => {
        const validationErrors = [];
        const titleExists = user.playlists.map(playlist => playlist.title).includes(title);
        const titleChange = user.playlists.filter(playlist => playlist.id === playlistToEdit)[0]?.title !== title;

        if (!title) validationErrors.push("Please provide title");
        if (titleExists && titleChange) validationErrors.push("Playlist already exists");
        setErrors(validationErrors);

        if (!validationErrors.length) {
            let s3CoverPhoto;
            let coverPhoto_URL = null;
            let coverPhoto_s3Name = null;
            
            if (coverPhoto) {
                await ReactS3Client
                    .uploadFile(coverPhoto, coverPhoto_title.split(" ").join("-"))
                    .then(data => s3CoverPhoto = data)
                    .catch(err => console.error(err))

                coverPhoto_URL = s3CoverPhoto.location;
                coverPhoto_s3Name = s3CoverPhoto.key;
            }

            await dispatch(playlistStore.thunk_editPlaylist({
                playlistToEdit,
                title,
                coverPhoto_URL,
                coverPhoto_s3Name
            }))
                .catch(async (res) => {
                    const data = await res;
                    if (data && data.errors) setErrors(data.errors)
                }).then((res) => res && history.push("/"));
            await dispatch(authenticate());
            setPlaylistToEdit('');
        } else {
            history.push("/");
        }
    }

    return (
        <div className="modal_background">
            <div className="modal_container">
                <div className="modal_logoClose_container">
                    <div className="form_logo">
                        <div className="formLogo_circle"><i id="formLogo_headphones" className="fas fa-headphones"></i></div>Jamify
                    </div>
                    <i onClick={() => setPlaylistToEdit('')} className="fas fa-window-close"></i>
                </div>
                <div className="form_headerText">Edit Playlist</div>

                {errors && <div className="error-container">
                    {errors.map((error, ind) => (
                        <div className="error-message" key={ind}>{error}</div>
                    ))}
                </div>}

                <div className="formInput_wrapper">
                    <input
                        className="form_inputField"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                    />
                </div>
                {currentPlaylist.coverPhoto_URL && !coverPhoto && <img className="form_image" alt="" src={currentPlaylist.coverPhoto_URL}></img>}
                {coverPhoto_title ?
                    <div className="fileInput_label">{coverPhoto_title}</div> :
                    <label className="fileInput_label" htmlFor="coverPhoto_input">Select cover photo (optional)</label>
                }
                <div className="formInput_wrapper">
                    <input
                        type="file"
                        id="coverPhoto_input"
                        onChange={(e) => { setCoverPhoto(e.target.files[0]); setCoverPhoto_title(e.target.files[0].name); }}
                    />
                </div>
                <div className="dividerLine" />
                <button onClick={() => editPlaylist(playlistToEdit)} className="form_submitButton">Save</button>
            </div>
        </div>
    )
};

export default EditPlaylistModal;
