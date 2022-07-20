import React from "react";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Header/navbar";
import CreatePost from "../../components/Home/CreatePost/CreatePost";
import Newfeeds from "../../components/Home/Newfeeds/Newfeeds";

const NewFeed = () => {
  return (
    <>
      <header>
        <Header />
        <Navbar />
      </header>
      <main>
        <div className="post-container">
          <CreatePost />
          <Newfeeds />
        </div>
      </main>
    </>
  );
};

export default NewFeed;
