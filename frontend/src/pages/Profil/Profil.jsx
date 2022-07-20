import React from "react";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Header/navbar";

import User from "../../components/ProfilPage/User";

const Profil = () => {
  return (
    <>
      <header>
        <Header />
        <Navbar />
      </header>
      <main>
        <User />
      </main>
    </>
  );
};

export default Profil;
