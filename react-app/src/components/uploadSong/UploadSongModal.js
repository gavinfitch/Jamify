import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './UploadSongModal.css';
import S3 from 'react-aws-s3';
import * as songStore from '../../store/song';

const UploadSongModal = ({ genresArr, setUploadSong }) => {
    const [errors, setErrors] = useState([]);
    const [audioFile, setAudioFile] = useState('')
    const [audioFile_title, setAudioFile_title] = useState('')
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [album, setAlbum] = useState(null);
    const [genre, setGenre] = useState('');
    const [albumCover, setAlbumCover] = useState('')
    const [albumCover_title, setAlbumCover_title] = useState('')

    const user = useSelector(state => state.sessionReducer.user);

    const dispatch = useDispatch()
    const history = useHistory()

    const s3envKey = process.env.REACT_APP_AWS_KEY;
    const s3envSecretKey = process.env.REACT_APP_AWS_SECRET_KEY;

    const config = {
        bucketName: 'jamify',
        region: 'us-west-2',
        accessKeyId: s3envKey,
        secretAccessKey: s3envSecretKey,
    }

    const ReactS3Client = new S3(config);

    const handleSubmit = async (e) => {
        e.preventDefault()

        const validationErrors = [];

        if (!audioFile) {
            validationErrors.push("Please provide valid audio file");
        }
        if (!title) {
            validationErrors.push("Please provide title");
        }
        if (!artist) {
            validationErrors.push("Please provide artist name");
        }
        if (!genre) {
            validationErrors.push("Please select genre");
        }

        setErrors(validationErrors);

        if (!validationErrors.length) {
            const userId = user.id;

            let s3Song;
            await ReactS3Client
                .uploadFile(audioFile, audioFile_title.split(" ").join("-"))
                .then(data => s3Song = data)
                .catch(err => console.error(err))

            const song_URL = s3Song.location;
            const song_s3Name = s3Song.key;

            let s3AlbumCover;
            let albumCover_URL = (null);
            let albumCover_s3Name = (null);

            if (albumCover) {
                await ReactS3Client
                    .uploadFile(albumCover, albumCover_title.split(" ").join("-"))
                    .then(data => s3AlbumCover = data)
                    .catch(err => console.error(err))

                albumCover_URL = s3AlbumCover.location;
                albumCover_s3Name = s3AlbumCover.key;
            } else {
                albumCover_URL = "https://jamify.s3.us-west-2.amazonaws.com/utils/Music_note.png"
            }

            setUploadSong(false);

            return dispatch(songStore.thunk_uploadSong({
                userId,
                title,
                song_URL,
                song_s3Name,
                album,
                artist,
                genre,
                albumCover_URL,
                albumCover_s3Name
            }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors)
                }).then((res) => res && history.push("/"));
        } else {
            history.push('/')
        }
    }

    return (
        <div className="modal_background">
            <form className="modal_container" onSubmit={handleSubmit}>
                <div className="modal_logoClose_container">
                    <div className="form_logo">
                        <div className="formLogo_circle"><i id="formLogo_headphones" class="fas fa-headphones"></i></div>Jamify
                    </div>
                    <i onClick={() => setUploadSong('')} class="fas fa-window-close"></i>
                </div>
                <div className="form_headerText">Upload Song</div>
                {errors && <div className="error-container">
                    {errors.map((error, ind) => (
                        <div className="error-message" key={ind}>{error}</div>
                    ))}
                </div>}
                {audioFile_title ? <div className="fileInput_label">{audioFile_title}</div> : <label className="fileInput_label" for="coverPhoto_input">Track select</label>}
                <div className="formInput_wrapper track_select">
                    <input
                        type="file"
                        onChange={(e) => { setAudioFile(e.target.files[0]); setAudioFile_title(e.target.files[0].name) }}
                    // required
                    />
                </div>
                <div className="formInput_wrapper">
                    <input
                        className="form_inputField_song"
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                    // required
                    />
                </div>
                <div className="formInput_wrapper">
                    <input
                        className="form_inputField_song"
                        type="text"
                        onChange={(e) => setArtist(e.target.value)}
                        placeholder="Artist"
                    // required
                    />
                </div>
                <div className="formInput_wrapper">
                    <input
                        className="form_inputField_song"
                        type="text"
                        onChange={(e) => setAlbum(e.target.value)}
                        placeholder="Album (optional)"
                    // required
                    />
                </div>
                <select className="form_inputField_dropdown" onChange={(e) => setGenre(e.target.value)}>
                    <option selected disabled hidden>Genre</option>
                    {genresArr && genresArr.map(genre => {
                        return <option value={genre}>{genre}</option>
                    })}
                </select>
                {albumCover_title ? <div className="fileInput_label">{albumCover_title}</div> : <label className="fileInput_label" for="coverPhoto_input">Upload album cover (optional)</label>}
                <div className="formInput_wrapper">
                    <input
                        type="file"
                        onChange={(e) => { setAlbumCover(e.target.files[0]); setAlbumCover_title(e.target.files[0].name) }}
                    />
                </div>
                <div className="dividerLine"></div>
                <button className="form_submitButton" type='submit'>Upload</button>
            </form>
        </div>
    )
};

export default UploadSongModal;