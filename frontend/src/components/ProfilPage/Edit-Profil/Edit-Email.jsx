import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { UidContext } from "../../AppContext";
import { useContext } from "react";
import { useState } from "react";

const EditEmail = ({ user }) => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [emailUpdate, setEmailUpdate] = useState(user.email);

  const uid = useContext(UidContext);
  return (
    <>
      {isUpdated === false && (
        <div>
          <div className="form--input--container">
            <p htmlFor="pseudo" className="form--label">
              Email
            </p>
            <p id="pseudo" className="form--input">
              {user.email}
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
              defaultValue={user.email}
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

export default EditEmail;
