import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { UidContext } from "../../AppContext";
import { useContext } from "react";

const EditPseudo = ({ user }) => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [pseudoUpdate, setPseudoUpdate] = useState(user.pseudo);

  const uid = useContext(UidContext);

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
            />
          </div>
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
