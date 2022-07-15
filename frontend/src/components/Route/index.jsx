import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../../pages/Login/Login";
import Profil from "../../pages/Profil/Profil";
import Newfeeds from "../../pages/NewsFeed/Home";

const RoutePage = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/trending" exact element={<Newfeeds />} />
        <Route path="/profil" exact element={<Profil />} />
      </Routes>
    </Router>
  );
};

export default RoutePage;
