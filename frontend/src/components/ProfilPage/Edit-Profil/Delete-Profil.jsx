import axios from "axios";
import React from "react";

const DeleteProfil = ({ user }) => {
  const userToken = document.cookie;

  const jwt = userToken.split("=");
  const config = {
    headers: {
      authorization: `bearer ${jwt[1]}`,
    },
  };
  const disableProfil = (e) => {
    if (window.confirm(`Voulez-vous désactiver ce compte?`)) {
      e.preventDefault();
      axios
        .delete(
          `${process.env.REACT_APP_API_URL}api/user/delete/${user.id}`,
          config
        )
        .then(() => console.log("Compte effacé"))
        .catch((err) => console.log(err));
      window.location = "/";
    } else {
      console.log("Bonjour");
    }
  };
  return (
    <div className="btn-delete-profil-container">
      <button className="btn-delete-profil" onClick={disableProfil}>
        Supprimer le compte
      </button>
    </div>
  );
};

export default DeleteProfil;
