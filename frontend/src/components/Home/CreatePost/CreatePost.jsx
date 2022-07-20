import axios from "axios";
import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faXmark } from "@fortawesome/free-solid-svg-icons";

const CreatePost = () => {
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState("");

  const user = document.cookie;

  const jwt = user.split("=");
  const config = {
    headers: {
      authorization: `bearer ${jwt[1]}`,
    },
  };

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append("content", message);
    formData.append("attachment", postPicture);

    console.log(formData);

    await axios
      .post(`${process.env.REACT_APP_API_URL}api/post/`, formData, config)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    document.location.reload();
  };

  return (
    <div className="createPost-container">
      <div className="formPost-container">
        <form className="formCreate-container" onSubmit={onSubmit}>
          <textarea
            placeholder="Message ..."
            className="text-container"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            value={message}
          />

          <div className="add-picture-container">
            <input
              type="file"
              name="attachment"
              id="picture"
              onChange={(e) => {
                setPostPicture(e.target.files[0]);
              }}
              // className="inpute-add-picture"
            />
            <button type="submit" value="Envoyer" className="btn">
              <FontAwesomeIcon icon={faPaperPlane} className="icone" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
