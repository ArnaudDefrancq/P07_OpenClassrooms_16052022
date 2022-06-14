import React from 'react';
import { Navigate } from 'react-router-dom';

const Newfeeds = ({authorized}) => {

    if (authorized) {
        return <Navigate to="/" />
    }

    return (
        <div>
            <form></form>
        </div>
    );
};

export default Newfeeds;