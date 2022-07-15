import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { UidContext } from "./components/AppContext";
import Route from "./components/Route";

const App = () => {
  const [uid, setUid] = useState(null);

  const user = document.cookie.split("=");
  const jwt = user[1].split(";");
  const JWT = jwt[0];

  //  recuperer l'userId avec le fait de trouver 1 seul
  const config = {
    headers: {
      authorization: `bearer ${JWT}`,
    },
  };

  useEffect(() => {
    const fetchId = async () => {
      axios
        .get(`${process.env.REACT_APP_API_URL}userId`, config)
        .then((res) => {
          setUid(res.data.userId);
        })
        .catch((err) => console.log(err));
    };
    fetchId();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <UidContext.Provider value={uid}>
      <Route />
    </UidContext.Provider>
  );
};

export default App;
