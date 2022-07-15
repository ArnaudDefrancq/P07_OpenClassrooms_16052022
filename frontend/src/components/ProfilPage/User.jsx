import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import EditPseudo from "./Edit-Profil/Edit-pseudo";
import EditEmail from "./Edit-Profil/Edit-Email";
import DeleteProfil from "./Edit-Profil/Delete-Profil";

const User = () => {
  const [loadUser, setLoaduser] = useState([]);

  const user = document.cookie.split("=");
  const jwt = user[1].split(";");
  const userId = user[2];
  const JWT = jwt[0];

  const config = {
    headers: {
      authorization: `bearer ${JWT}`,
    },
  };
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${userId}`, config)
      .then((res) => {
        setLoaduser(res.data);
      })
      .catch((err) => console.log(err));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="profil-container">
        <form className="profil-container--form">
          <EditPseudo user={loadUser} />
          <EditEmail user={loadUser} />
          <DeleteProfil user={loadUser} />
        </form>
      </div>
    </>
  );
};

export default User;
