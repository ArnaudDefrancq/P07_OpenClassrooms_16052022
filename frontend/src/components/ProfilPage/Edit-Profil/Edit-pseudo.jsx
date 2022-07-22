import React from "react";
import { useState, useRef } from "react";

import axios from "axios";

const EditPseudo = ({ user }) => {
  const [pseudoUpdate, setPseudoUpdate] = useState(user.pseudo);
  const refSignupPseudoError = useRef();
  const refSignupPseudo = useRef();

  const userToken = document.cookie;

  const jwt = userToken.split("=");
  const config = {
    headers: {
      authorization: `bearer ${jwt[1]}`,
    },
  };
  const checkPseudo = (pseudo) => {
    if (/^[a-zA-Z0-9\s]{3,40}$/.test(pseudo)) {
      refSignupPseudoError.current.textContent = " ";
      return true;
    } else {
      refSignupPseudoError.current.textContent =
        "Votre pseudo doit faire entre 3 et 30 caractères";
      return false;
    }
  };

  const updateProfil = async (e) => {
    e.preventDefault();
    if (checkPseudo(pseudoUpdate)) {
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
    } else {
      return console.log("problleme");
    }
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
            checkPseudo(e.target.value);
          }}
          ref={refSignupPseudo}
        />
      </div>
      <div ref={refSignupPseudoError} className="signup-error"></div>

      <div className="form--input--container">
        <label htmlFor="pseudo" className="form--label">
          Email :
        </label>
        <input
          type="email"
          defaultValue={user.email}
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
