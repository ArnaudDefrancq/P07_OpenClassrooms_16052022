import React from "react";
import Header from "../../components/Header/Header";
import User from "../../components/ProfilPage/User/User";
import { UidContext } from "../../components/AppContext";
import { useContext } from "react";

const Profil = () => {
  const uid = useContext(UidContext);
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <User />
      </main>
    </>
  );
};

export default Profil;
