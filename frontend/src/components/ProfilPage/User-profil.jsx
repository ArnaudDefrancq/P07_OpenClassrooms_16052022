import axios from "axios";
import React from "react";
import { UidContext } from "../AppContext";
import { useContext } from "react";

const UserProfil = () => {
  const uid = useContext(UidContext);

  const user = document.cookie.split("=");

  const config = {
    headers: {
      authorization: `bearer ${user[1]}`,
    },
  };

  const handleClick = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`, config)
      .then((res) => {
        if (res) {
          window.location = "/profil";
        } else {
          console.log("err");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <button onClick={handleClick}>Profil</button>
    </>
  );
};

export default UserProfil;
