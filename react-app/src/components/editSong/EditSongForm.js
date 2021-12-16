import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router"
import { useHistory } from 'react-router-dom';
import './EditSongForm.css';
import S3 from 'react-aws-s3';
import * as songStore from '../../store/song';

const EditSongForm = () => {
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [album, setAlbum] = useState('');
    const [genre, setGenre] = useState('');
    const [albumCover, setAlbumCover] = useState('')
    const [albumCover_title, setAlbumCover_title] = useState('')

    const user = useSelector(state => state.sessionReducer.user);
    const allSongs = useSelector((state) => state.songReducer.allSongs)

    const dispatch = useDispatch()
    const history = useHistory()

    const { id } = useParams();
    const songId = id;

    let currentSong;
    if (allSongs) {
        currentSong = allSongs.filter(song => song.id == songId)
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

    const handleSubmit = async (e) => {
        e.preventDefault()

        const userId = user.id;

        // let s3AlbumCover;
        // await ReactS3Client
        //     .uploadFile(albumCover, albumCover_title.split(" ").join("-"))
        //     .then(data => s3AlbumCover = data)
        //     .catch(err => console.error(err))

        // const albumCover_URL = s3AlbumCover.location;
        // const albumCover_s3Name = s3AlbumCover.key;

        // return dispatch(songStore.thunk_editSong({
        //     userId,
        //     title,
        //     song_URL,
        //     song_s3Name,
        //     album,
        //     artist,
        //     genre,
        //     albumCover_URL,
        //     albumCover_s3Name
        // }))
        //     .catch(async (res) => {
        //         const data = await res.json();
        //         if (data && data.errors) setErrors(data.errors)
        //     }).then((res) => res && history.push("/"));
    }

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <div>
                    {errors.map((error, index) => (
                        <div key={index}>{error}</div>
                    ))}
                </div>
                <div>
                    <input
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                    // required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        onChange={(e) => setArtist(e.target.value)}
                        placeholder="Artist"
                    // required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        onChange={(e) => setAlbum(e.target.value)}
                        placeholder="Album (optional)"
                    // required
                    />
                </div>
                <select onChange={(e) => setGenre(e.target.value)}>
                    <option value="Ambient">Ambient</option>
                    <option value="Blues">Blues</option>
                    <option value="Country">Country</option>
                    <option value="Classical">Classical</option>
                    <option value="Electronic">Electronic</option>
                    <option value="Metal">Metal</option>
                    <option value="Punk">Punk</option>
                    <option value="Post-Punk">Post-Punk</option>
                    <option value="Jazz">Jazz</option>
                    <option value="Rock">Rock</option>
                    <option value="Rhythm and blues">Rhythm and blues</option>
                    <option value="Shoegaze">Shoegaze</option>
                    <option value="Soul">Soul</option>
                </select>
                {albumCover_title && <div>{albumCover_title}</div>}
                <div>
                    <input
                        type="file"
                        onChange={(e) => { setAlbumCover(e.target.files[0]); setAlbumCover_title(e.target.files[0].name) }}
                    />
                </div>
                <button type='submit'>Edit</button>
            </form>
        </section>
    )
};

export default EditSongForm;