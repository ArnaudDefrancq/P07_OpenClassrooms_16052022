import React from "react";
import { useState } from "react";

import axios from "axios";

const EditPseudo = ({ user }) => {
  const [pseudoUpdate, setPseudoUpdate] = useState();

  const userToken = document.cookie;

  const jwt = userToken.split("=");
  const config = {
    headers: {
      authorization: `bearer ${jwt[1]}`,
    },
  };

  const updateProfil = async (e) => {
    e.preventDefault();

    const newPseudo = { pseudo: pseudoUpdate };

    await axios
      .put(
        `${process.env.REACT_APP_API_URL}api/user/update/${user.id}`,
        newPseudo,
        config
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    window.location.reload();
  };

  return (
    <>
      <div className="form--input--container">
        <p htmlFor="pseudo" className="form--label">
          Pseudo :
        </p>
        <input
          type="text"
          id="pseudo"
          className="form--input"
          defaultValue={user.pseudo}
          onChange={(e) => {
            setPseudoUpdate(e.target.value);
          }}
        />
      </div>

      <div className="form--input--container">
        <label htmlFor="pseudo" className="form--label">
          Email :
        </label>
        <input
          type="email"
          value={user.email}
          id="pseudo"
          className="form--input"
          disabled
        />
      </div>
      <div className="update-profil-container">
        <button onClick={updateProfil} className="update-profil">
          Enregistrer
        </button>
      </div>
    </>
  );
};

export default EditPseudo;
