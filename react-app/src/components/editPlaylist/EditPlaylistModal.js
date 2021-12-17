import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { useParams } from "react-router"
import { useHistory } from 'react-router-dom';
import './EditPlaylistModal.css';
import S3 from 'react-aws-s3';
import * as playlistStore from '../../store/playlist';

const EditPlaylistModal = ({playlistToEdit, setPlaylistToEdit}) => {
    const [errors, setErrors] = useState([]);
    const user = useSelector(state => state.sessionReducer.user);

    const dispatch = useDispatch()
    const history = useHistory()

    // const [playlistToEdit, setPlaylistToEdit] = useState('');
    const [title, setTitle] = useState('');
    const [coverPhoto, setCoverPhoto] = useState('')
    const [coverPhoto_title, setCoverPhoto_title] = useState('')

    const s3envKey = process.env.REACT_APP_AWS_KEY;
    const s3envSecretKey = process.env.REACT_APP_AWS_SECRET_KEY;

    const config = {
        bucketName: 'jamify',
        region: 'us-west-2',
        accessKeyId: s3envKey,
        secretAccessKey: s3envSecretKey,
    }

    const ReactS3Client = new S3(config);

    const editPlaylist = async () => {
        // e.preventDefault()

        const userId = user.id;
        let s3CoverPhoto;

        await ReactS3Client
            .uploadFile(coverPhoto, coverPhoto_title.split(" ").join("-"))
            .then(data => s3CoverPhoto = data)
            .catch(err => console.error(err))

        const coverPhoto_URL = s3CoverPhoto.location;
        const coverPhoto_s3Name = s3CoverPhoto.key;

        return dispatch(playlistStore.thunk_editPlaylist({
            playlistToEdit,
            title,
            coverPhoto_URL,
            coverPhoto_s3Name
        }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            }).then((res) => res && history.push("/"));
    }

    return (
        <div className="addSongModal_background">
            <div className="addSong_modal">
                <i onClick={() => setPlaylistToEdit('')} class="fas fa-window-close"></i>
                <div className="addSong_header">Edit playlist details</div>
                <div>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                    // required
                    />
                </div>
                {coverPhoto_title && <div>{coverPhoto_title}</div>}
                <div>
                    <input
                        type="file"
                        onChange={(e) => { setCoverPhoto(e.target.files[0]); setCoverPhoto_title(e.target.files[0].name) }}
                    />
                </div>
                <button onClick={() => editPlaylist(playlistToEdit)} className="addSong_button">Edit playlist</button>
            </div>
        </div>
    )
};

export default EditPlaylistModal;