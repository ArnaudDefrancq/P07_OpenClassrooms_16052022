import React from "react";
import Header from "../../components/Header/Header";
import Logout from "../../components/Header/Logout";
import CreatePost from "../../components/Home/CreatePost/CreatePost";
import Newfeeds from "../../components/Home/Newfeeds/Newfeeds";
import UserProfil from "../../components/ProfilPage/User-profil";

const NewFeed = () => {
  return (
    <>
      <header>
        <Header />
        <Logout />
        <UserProfil />
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
