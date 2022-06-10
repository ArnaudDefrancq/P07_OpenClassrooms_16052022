import React from 'react';
import { Navigate } from 'react-router-dom';

const Newfeeds = ({authorized}) => {

    if (!authorized) {
        return <Navigate to="/" />
    }

    return (
        <div>
            <h1>NewFeeds</h1>
        </div>
    );
};

export default Newfeeds;