import React from "react";
import Header from "../../components/Header/Header";
import Logout from "../../components/Header/Logout";
import NewfeedsPage from "../../components/ProfilPage/Newfeeds-Page";
import User from "../../components/ProfilPage/User";

const Profil = () => {
  return (
    <>
      <header>
        <Header />
        <Logout />
        <NewfeedsPage />
      </header>
      <main>
        <User />
      </main>
    </>
  );
};

export default Profil;
