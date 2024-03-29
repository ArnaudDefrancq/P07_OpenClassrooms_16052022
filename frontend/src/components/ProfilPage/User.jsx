import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import EditPseudo from "./Edit-Profil/Edit-pseudo";
import DeleteProfil from "./Edit-Profil/Delete-Profil";

const User = () => {
  const [loadUser, setLoaduser] = useState([]);
  const userId = localStorage.getItem("UserId");

  const user = document.cookie;
  const jwt = user.split("=");
  const config = {
    headers: {
      authorization: `bearer ${jwt[1]}`,
    },
  };
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${process.env.REACT_APP_API_URL}api/user/${userId}}`, config)
        .then((res) => {
          setLoaduser(res.data);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="profil-container">
        <form className="profil-container--form">
          <EditPseudo user={loadUser} />
          <DeleteProfil user={loadUser} />
        </form>
      </div>
    </>
  );
};

export default User;
