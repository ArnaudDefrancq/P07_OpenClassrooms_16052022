import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const Logout = () => {
  const handleClick = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/auth/logout`)
      .then((res) => {
        if (res) {
          window.location = "/";
        } else {
          console.log("err");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <button className="logout" onClick={handleClick}>
        <FontAwesomeIcon icon={faRightFromBracket} />
      </button>
    </>
  );
};

export default Logout;
