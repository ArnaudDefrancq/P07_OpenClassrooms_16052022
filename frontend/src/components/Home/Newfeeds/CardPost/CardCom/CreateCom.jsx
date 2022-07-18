import React from "react";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const CreateCom = ({ post }) => {
  const [comValue, setComValue] = useState([]);

  const user = document.cookie;

  const jwt = user.split("=");
  console.log(jwt[1]);
  const config = {
    headers: {
      authorization: `bearer ${jwt[1]}`,
    },
  };

  const handleSubmit = async () => {
    const data = {
      content: comValue,
      PostId: `${post.id}`,
    };

    console.log(data);

    await axios
      .post(`${process.env.REACT_APP_API_URL}api/com/${post.id}`, data, config)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="create-com">
        <textarea
          onChange={(e) => {
            setComValue(e.target.value);
          }}
          value={comValue}
          className="com-container"
          placeholder="Commentaire ..."
        />
        <button type="submit" className="btn-com">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
    </div>
  );
};

export default CreateCom;
