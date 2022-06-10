import React from "react";
import Login from "./pages/Login/Login";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import NewFeed from "./pages/NewsFeed/NewFeed";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/newfeeds" element={() => <NewFeed /> } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
