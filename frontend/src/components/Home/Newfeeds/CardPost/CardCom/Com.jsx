import React from "react";
import { UidContext } from "../../../../AppContext";
import { useContext } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Moment from "react-moment";
import "moment/locale/fr";

const Com = ({ com, userAdmin }) => {
  const uid = useContext(UidContext);

  const user = document.cookie;

  const jwt = user.split("=");
  const config = {
    headers: {
      authorization: `bearer ${jwt[1]}`,
    },
  };

  const deleteCom = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}api/com/${com.id}`, config)
      .then(() => {
        console.log("com effacé");
      })
      .catch((err) => console.log(err));
    document.location.reload();
  };
  return (
    <>
      <li className="card-com">
        <div className="coms">
          <div className="coms-container">
            <div className="author-com-container">
              <p className="author-com">{com.User.pseudo}</p>
              <p className="date">
                <Moment local="fr" fromNow>
                  {com.createdAt}
                </Moment>
              </p>
            </div>
            <p className="com-content">{com.content}</p>
          </div>

          {com.UserId === uid || userAdmin ? (
            <button className="delete-com" onClick={deleteCom}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          ) : null}
        </div>
      </li>
    </>
  );
};

export default Com;
