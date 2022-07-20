import axios from "axios";
import React from "react";

const UserProfil = () => {
  const user = document.cookie;

  const jwt = user.split("=");
  const config = {
    headers: {
      authorization: `bearer ${jwt[1]}`,
    },
  };

  const handleClick = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/user/${localStorage.getItem(
          "UserId"
        )}`,
        config
      )
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
      <button className="btn-profil" onClick={handleClick}>
        Profil
      </button>
    </>
  );
};

export default UserProfil;
