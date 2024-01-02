import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticate } from './store/session';
import Home from './components/Home';
import LoginForm from './components/auth/LoginForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import SignUpForm from './components/auth/SignUpForm';


function App() {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            await dispatch(authenticate());
            setLoaded(true);
        })();
    }, [dispatch]);

    if (!loaded) return null;
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/login' exact={true}>
                    <LoginForm />
                </Route>
                <Route path='/signup' exact={true}>
                    <SignUpForm />
                </Route>
                <ProtectedRoute path='/' exact={true}>
                    <Home />
                </ProtectedRoute>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
