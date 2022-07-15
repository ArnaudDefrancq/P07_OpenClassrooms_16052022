import axios from "axios";
import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useRef } from "react";

const CreatePost = () => {
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState("");
  const [preview, setPreview] = useState("");
  const fileInputRef = useRef();

  const user = document.cookie.split("=");
  const jwt = user[1].split(";");
  const JWT = jwt[0];

  const config = {
    headers: {
      authorization: `bearer ${JWT}`,
    },
  };

  useEffect(() => {
    if (postPicture) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(postPicture);
    } else {
      setPreview(null);
    }
  }, [postPicture]);

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
          {postPicture ? (
            <div className="preview-picture">
              <img
                src={preview}
                alt="File selectionné"
                className="picture-preview"
              />
              <button
                className="btn delete-picture-preview"
                onClick={(e) => {
                  e.preventDefault();
                  setPostPicture(null);
                }}
              >
                <FontAwesomeIcon icon={faXmark} className="icone" />
              </button>
            </div>
          ) : null}
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
              ref={fileInputRef}
              className="inpute-add-picture"
            />
            <button
              className="btn-add-picture"
              onClick={(e) => {
                e.preventDefault();
                fileInputRef.current.click();
              }}
            >
              Choisir une image
            </button>

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
