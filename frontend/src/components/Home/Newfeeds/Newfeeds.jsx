import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import CardPost from "./CardPost/CardPost";

const Newfeeds = () => {
  const [loadPost, setLoadPost] = useState([]);

  const user = document.cookie;

  const jwt = user.split("=");
  const config = {
    headers: {
      authorization: `bearer ${jwt[1]}`,
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
      <h1 className="feed-title">Publications récentes</h1>
      <ul className="feed-list">
        {loadPost.map((post) => {
          return <CardPost post={post} key={post.id} />;
        })}
      </ul>
    </div>
  );
};

export default Newfeeds;
