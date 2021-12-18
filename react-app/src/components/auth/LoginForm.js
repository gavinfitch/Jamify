import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Router, useHistory } from 'react-router-dom';
import { login } from '../../store/session';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.sessionReducer.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="modal_background">
      <form className="modal_container" onSubmit={onLogin}>
        <div className="form_logo">
          <div className="formLogo_circle"><i id="formLogo_headphones" class="fas fa-headphones"></i></div>Jamify
        </div>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className="formInput_wrapper">
          <input
            className="form_inputField_song"
            name='email'
            type='text'
            placeholder='Email or username'
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div className="formInput_wrapper">
          <input
            className="form_inputField_song"
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />
        </div>
        <div className="dividerLine"></div>
        <button className="form_submitButton" type='submit'>Login</button>
        <div>Don't have an account? <span onClick={() => history.push('/sign-up')}>SIGNUP</span></div>
      </form>
    </div>
  );
};

export default LoginForm;
