import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = props => {
    const user = useSelector(state => state.sessionReducer.user);

    return (
        <Route {...props}>
            {(user) ? props.children : <Redirect to='/login' />}
        </Route>
    )
};

export default ProtectedRoute;
