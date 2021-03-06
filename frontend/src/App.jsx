import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { UidContext } from "./components/AppContext";
import Route from "./components/Route";

const App = () => {
  const [uid, setUid] = useState(null);

  const user = document.cookie;

  const jwt = user.split("=");
  const config = {
    headers: {
      authorization: `bearer ${jwt[1]}`,
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

  //  recuperer l'userId avec le fait de trouver 1 seul

  return (
    <UidContext.Provider value={uid}>
      <Route />
    </UidContext.Provider>
  );
};

export default App;
