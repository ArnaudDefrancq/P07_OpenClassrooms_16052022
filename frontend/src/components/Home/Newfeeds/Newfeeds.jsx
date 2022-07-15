import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import CardPost from "./CardPost/CardPost";

const Newfeeds = () => {
  const [loadPost, setLoadPost] = useState([]);

  // récup le jwt et userId
  const user = document.cookie.split("=");
  const jwt = user[1].split(";");
  const JWT = jwt[0];

  const config = {
    headers: {
      authorization: `bearer ${JWT}`,
    },
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/post/`, config)
      .then((res) => setLoadPost(res.data))
      .catch((err) => console.log(err));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="feed-container">
      <h1 className="feed-title">Publication récentes</h1>
      <ul className="feed-list">
        {loadPost.map((post) => {
          return <CardPost post={post} key={post.id} />;
        })}
      </ul>
    </div>
  );
};

export default Newfeeds;
