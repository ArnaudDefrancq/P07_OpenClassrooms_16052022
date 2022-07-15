import axios from "axios";
import React from "react";

const UserProfil = () => {
  const user = document.cookie.split("=");
  const jwt = user[1].split(";");
  const userId = user[2];
  const JWT = jwt[0];

  const config = {
    headers: {
      authorization: `bearer ${JWT}`,
    },
  };

  const handleClick = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${userId}`, config)
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
