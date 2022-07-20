import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const user = document.cookie;

  const jwt = user.split("=");
  const config = {
    headers: {
      authorization: `bearer ${jwt[1]}`,
    },
  };

  const handleClickProfil = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/user/${localStorage.getItem(
          "UserId"
        )}`,
        config
      )
      .then((res) => {
        if (res) {
          window.location = "/profil";
        } else {
          console.log("err");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleClickLogout = () => {
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
  const handleClickNewfeeds = () => {
    window.location = "/trending";
  };
  return (
    <>
      <nav className="navbar navbar-1">
        <ul className="under-navbar">
          <li>
            <button className="btn-navbar" onClick={handleClickNewfeeds}>
              Accueil
            </button>
          </li>
          <li>
            <button className="btn-navbar" onClick={handleClickProfil}>
              Profil
            </button>
          </li>
          <li>
            <button className="btn-navbar" onClick={handleClickLogout}>
              <FontAwesomeIcon icon={faRightFromBracket} />
            </button>
          </li>
        </ul>
      </nav>
      <nav className="navbar navbar-2">
        <button className="btn-navbar-2">
          <FontAwesomeIcon icon={faBars} />
        </button>
        <ul className="under-navbar">
          <li>
            <button className="btn-navbar" onClick={handleClickNewfeeds}>
              Accueil
            </button>
          </li>
          <li>
            <button className="btn-navbar" onClick={handleClickProfil}>
              Profil
            </button>
          </li>
        </ul>
      </nav>
      <button className="btn-logout" onClick={handleClickLogout}>
        <FontAwesomeIcon icon={faRightFromBracket} />
      </button>
    </>
  );
};

export default Navbar;
