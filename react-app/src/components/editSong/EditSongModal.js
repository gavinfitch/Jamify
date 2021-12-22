import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router"
import { useHistory } from 'react-router-dom';
import './EditSongModal.css';
import S3 from 'react-aws-s3';
import * as songStore from '../../store/song';
import * as playlistStore from '../../store/playlist';

const EditSongForm = ({ genresArr, editSong, setEditSong }) => {
    const [errors, setErrors] = useState([]);

    const user = useSelector(state => state.sessionReducer.user);
    const allSongs = useSelector((state) => state.songReducer.allSongs)

    const dispatch = useDispatch()
    const history = useHistory()

    let currentSong;
    if (allSongs) {
        currentSong = allSongs.filter(song => song.id == editSong)[0]
    }

    const [title, setTitle] = useState(currentSong?.title);
    const [artist, setArtist] = useState(currentSong?.artist);
    const [album, setAlbum] = useState(currentSong?.album);
    const [genre, setGenre] = useState(currentSong?.genre);
    const [albumCover, setAlbumCover] = useState('')
    const [albumCover_title, setAlbumCover_title] = useState('')

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
            const songId = editSong;

            let albumCover_URL = '';
            let albumCover_s3Name = '';

            if (albumCover) {
                let s3AlbumCover;

                await ReactS3Client
                    .uploadFile(albumCover, albumCover_title.split(" ").join("-"))
                    .then(data => s3AlbumCover = data)
                    .catch(err => console.error(err))

                albumCover_URL = s3AlbumCover.location;
                albumCover_s3Name = s3AlbumCover.key;
            }

            setEditSong('')

            return dispatch(songStore.thunk_editSong({
                songId,
                title,
                album,
                artist,
                genre,
                albumCover_URL,
                albumCover_s3Name
            }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors)
                }).then((res) => { dispatch(playlistStore.thunk_getAllPlaylists()); res && history.push("/") });
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
                    <i onClick={() => setEditSong('')} class="fas fa-window-close"></i>
                </div>
                <div className="form_headerText">Edit Song</div>
                {errors && <div className="error-container">
                    {errors.map((error, ind) => (
                        <div className="error-message" key={ind}>{error}</div>
                    ))}
                </div>}
                <div className="formInput_wrapper">
                    <input
                        className="form_inputField_song"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                    // required
                    />
                </div>
                <div className="formInput_wrapper">
                    <input
                        className="form_inputField_song"
                        type="text"
                        value={artist}
                        onChange={(e) => setArtist(e.target.value)}
                        placeholder="Artist"
                    // required
                    />
                </div>
                <div className="formInput_wrapper">
                    <input
                        className="form_inputField_song"
                        type="text"
                        value={album}
                        onChange={(e) => setAlbum(e.target.value)}
                        placeholder="Album (optional)"
                    // required
                    />
                </div>
                <select className="form_inputField_dropdown" onChange={(e) => setGenre(e.target.value)}>
                    <option selected disabled hidden>Genre</option>
                    {genresArr && genresArr.map(genreOption => {
                        return genreOption === genre ? <option selected value={genreOption}>{genreOption}</option> : <option value={genreOption}>{genreOption}</option>
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
                <button className="form_submitButton" type='submit'>Save</button>
            </form>
        </div>
    )
};

export default EditSongForm;