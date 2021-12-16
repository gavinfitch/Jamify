import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './UploadSongForm.css';
import S3 from 'react-aws-s3';
import * as songStore from '../../store/song';

const UploadSongForm = () => {
    const [errors, setErrors] = useState([]);
    const [audioFile, setAudioFile] = useState('')
    const [audioFile_title, setAudioFile_title] = useState('')
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [album, setAlbum] = useState('');
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

        const userId = user.id;

        let s3Song;
        await ReactS3Client
            .uploadFile(audioFile, audioFile_title.split(" ").join("-"))
            .then(data => s3Song = data)
            .catch(err => console.error(err))

        const song_URL = s3Song.location;
        const song_s3Name = s3Song.key;

        let s3AlbumCover;
        await ReactS3Client
            .uploadFile(albumCover, albumCover_title.split(" ").join("-"))
            .then(data => s3AlbumCover = data)
            .catch(err => console.error(err))

        const albumCover_URL = s3AlbumCover.location;
        const albumCover_s3Name = s3AlbumCover.key;

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
    }

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <div>
                    {errors.map((error, index) => (
                        <div key={index}>{error}</div>
                    ))}
                </div>
                {audioFile_title && <div>{audioFile_title}</div>}
                <div>
                    <input
                        type="file"
                        onChange={(e) => { setAudioFile(e.target.files[0]); setAudioFile_title(e.target.files[0].name) }}
                    // required
                    />
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
                {/* <h3>Add a caption</h3>
                <div>
                    <textarea className="input-field text-area-field"
                        name='email'
                        type='textarea'
                        placeholder=''
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                    ></textarea>
                </div> */}
                <button type='submit'>Upload</button>
            </form>
        </section>
    )
};

export default UploadSongForm;