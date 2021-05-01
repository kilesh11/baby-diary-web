import React from 'react';
import { Redirect, Route } from 'react-router';
import { useAuth } from '@context/AuthContext';

const ProtectedRoute = (props) => {
    const { user } = useAuth();
    return user ? <Route {...props} component={props.component} /> : <Redirect to="/login" />;
};

export default ProtectedRoute;
