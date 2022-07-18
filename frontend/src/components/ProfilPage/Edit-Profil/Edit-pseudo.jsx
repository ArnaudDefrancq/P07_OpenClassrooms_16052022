import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { UidContext } from "../../AppContext";
import { useContext } from "react";
import axios from "axios";

const EditPseudo = ({ user }) => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [pseudoUpdate, setPseudoUpdate] = useState(user.pseudo);

  const userToken = document.cookie;

  const jwt = userToken.split("=");
  const config = {
    headers: {
      authorization: `bearer ${jwt[1]}`,
    },
  };

  const uid = useContext(UidContext);

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
      {isUpdated === false && (
        <div>
          <div className="form--input--container">
            <p htmlFor="pseudo" className="form--label">
              Pseudo
            </p>
            <p id="pseudo" className="form--input">
              {user.pseudo}
            </p>
          </div>
        </div>
      )}
      {isUpdated === true && (
        <div>
          <div className="form--input--container">
            <label htmlFor="pseudo" className="form--label">
              Pseudo
            </label>
            <input
              type="text"
              id="pseudo"
              className="form--input"
              defaultValue={user.pseudo}
              onChange={(e) => setPseudoUpdate(e.target.value)}
            />
          </div>
          <button onClick={updateProfil}>Validé</button>
        </div>
      )}
      {user.id === uid && (
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsUpdated(!isUpdated);
          }}
        >
          <FontAwesomeIcon icon={faFile} />
        </button>
      )}
    </>
  );
};

export default EditPseudo;
