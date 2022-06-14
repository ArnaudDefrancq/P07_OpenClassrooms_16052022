import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Login from '../../pages/Login/Login';
import Profil from '../../pages/Profil/Profil';
import Newfeeds from '../../pages/NewsFeed/Home'


const RoutePage = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<Login />} />
                <Route path="/profil" exact element={<Profil />} />
                <Route path="/trending" exact element={<Newfeeds />} />
                <Navigate to="/" />
            </Routes>
        </Router>
    );
};

export default RoutePage;