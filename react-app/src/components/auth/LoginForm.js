import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import './LoginForm.css';
import { login } from '../../store/session';


const LoginForm = () => {
    const [credential, setCredential] = useState('');
    const [errors, setErrors] = useState([]);
    const [password, setPassword] = useState('');
    const user = useSelector(state => state.sessionReducer.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const onLogin = async (e) => {
        e.preventDefault();

        const validationErrors = [];
        if (!credential) validationErrors.push("Please provide email or username");
        if (!password) validationErrors.push("Please provide password");
        setErrors(validationErrors);

        if (!validationErrors.length) {
            const data = await dispatch(login(credential, password));
            if (data) {
                console.log("data");
                setErrors(data);
            }
        } else {
            history.push("/login");
        }
    };

    const updateCredential = (e) => {
        setCredential(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    const loginAsGuest = () => {
        setCredential("Guest");
        setPassword("Guest123!@#");
        dispatch(login(credential, password));
    }

    if (user) return <Redirect to='/' />;

    return (
        <div className="authForm_background">
            <form className="authForm_container" onSubmit={onLogin}>
                <div className="authForm_logo">
                    <div className="authFormLogo_circle"><i id="authFormLogo_headphones" className="fas fa-headphones"></i></div>Jamify
                </div>
                <div className="authForm_headerText">Log In</div>

                {errors && <div className="error-container">
                    {errors.map((error, i) => (
                        <div className="error-message" key={i}>{error}</div>
                    ))}
                </div>}

                <div className="formInput_wrapper">
                    <input
                        className="form_inputField_song"
                        name="email"
                        type="text"
                        placeholder="Email or username"
                        value={credential}
                        onChange={updateCredential}
                    />
                </div>
                <div className="formInput_wrapper">
                    <input
                        className="form_inputField_song"
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={updatePassword}
                    />
                </div>
                <div className="dividerLine" />
                <button className="authForm_submitButton" type='submit'>Login</button>
                <button onClick={() => loginAsGuest()} className="authForm_submitButton_black">Login as Guest</button>
                <div className="authForm_redirectText">Don't have an account? <span className="authForm_redirectLink" onClick={() => history.push('/signup')}>SIGNUP</span></div>
            </form>
            <div className="connect">
                <div className="connect-item" id="connect-text">Connect with the developer</div>
                <a className="connect-item connect-icon" id="email-link" href="mailto:gavin.fitch@gmail.com" target="_blank" rel="noreferrer"><i class="fas fa-envelope"></i></a>
                <a className="connect-item connect-icon" id="linkedin-link" href="https://www.linkedin.com/in/gavinfitch/" target="_blank" rel="noreferrer"><i class="fab fa-linkedin"></i></a>
                <a className="connect-item connect-icon" id="github-link" href="https://github.com/gavinfitch" target="_blank" rel="noreferrer"><i class="fab fa-github"></i></a>
            </div>
        </div>
    );
};

export default LoginForm;
