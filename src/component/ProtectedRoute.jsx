import React from 'react';
import { Redirect, Route } from 'react-router';
import { useAuth } from '@context/AuthContext';
import { useBaby } from '@context/BabyContext';

const ProtectedRoute = (props) => {
    const { user } = useAuth();
    const { selectedBaby } = useBaby();
    const { requireBaby, ...rest } = props;

    if (requireBaby) {
        return user ? (
            selectedBaby ? (
                <Route {...rest} component={rest.component} />
            ) : (
                <Redirect to="/baby" />
            )
        ) : (
            <Redirect to="/login" />
        );
    }
    return user ? <Route {...rest} component={rest.component} /> : <Redirect to="/login" />;
};

export default ProtectedRoute;
