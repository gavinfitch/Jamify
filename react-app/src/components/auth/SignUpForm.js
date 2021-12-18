import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import S3 from 'react-aws-s3';
import { signUp } from '../../store/session';
import './SignUpForm.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [userPhoto, setUserPhoto] = useState('')
  const [userPhoto_title, setUserPhoto_title] = useState('')
  const user = useSelector(state => state.sessionReducer.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const s3envKey = process.env.REACT_APP_AWS_KEY;
  const s3envSecretKey = process.env.REACT_APP_AWS_SECRET_KEY;

  const config = {
    bucketName: 'jamify',
    region: 'us-west-2',
    accessKeyId: s3envKey,
    secretAccessKey: s3envSecretKey,
  }

  const ReactS3Client = new S3(config);

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {

      let s3userPhoto;
      let photo_URL = (null);
      let photo_s3Name = (null);

      if (userPhoto) {
        await ReactS3Client
          .uploadFile(userPhoto, userPhoto_title.split(" ").join("-"))
          .then(data => s3userPhoto = data)
          .catch(err => console.error(err))

        photo_URL = s3userPhoto.location;
        photo_s3Name = s3userPhoto.key;
      } else {
        photo_URL = "https://jamify.s3.us-west-2.amazonaws.com/utils/default_user_profile_image.png"
      }

      const data = await dispatch(signUp(name, username, email, password, photo_URL, photo_s3Name));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="authForm_background">
      <form className="authForm_container" onSubmit={onSignUp}>
        <div className="authForm_logo">
          <div className="authFormLogo_circle"><i id="authFormLogo_headphones" class="fas fa-headphones"></i></div>Jamify
        </div>
        <div className="authForm_headerText">Sign Up</div>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className="formInput_wrapper">
          <input
            className="form_inputField_song"
            type='text'
            name='name'
            onChange={updateName}
            placeholder='Full name'
            value={name}
          ></input>
        </div>
        <div className="formInput_wrapper">
          <input
            className="form_inputField_song"
            type='text'
            name='username'
            onChange={updateUsername}
            placeholder='Username'
            value={username}
          ></input>
        </div>
        <div className="formInput_wrapper">
          <input
            className="form_inputField_song"
            type='text'
            name='email'
            onChange={updateEmail}
            placeholder='Email'
            value={email}
          ></input>
        </div>
        <div className="formInput_wrapper">
          <input
            className="form_inputField_song"
            type='password'
            name='password'
            onChange={updatePassword}
            placeholder='Password'
            value={password}
          ></input>
        </div>
        <div className="formInput_wrapper">
          <input
            className="form_inputField_song"
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            placeholder='Confirm password'
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        {userPhoto_title ? <div className="signup_fileInput_label">{userPhoto_title}</div> : <label className="signup_fileInput_label" for="coverPhoto_input">Select profile photo (optional)</label>}
        <div className="signup_formInput_wrapper">
          <input
            type="file"
            onChange={(e) => { setUserPhoto(e.target.files[0]); setUserPhoto_title(e.target.files[0].name) }}
          />
        </div>
        <div className="dividerLine"></div>
        <button className="signup_submitButton" type='submit'>Sign Up</button>
        <div className="signup_authForm_redirectText">Already have an account? <span className="authForm_redirectLink" onClick={() => history.push('/login')}>LOGIN</span></div>
      </form>
    </div>
  );
};

export default SignUpForm;
