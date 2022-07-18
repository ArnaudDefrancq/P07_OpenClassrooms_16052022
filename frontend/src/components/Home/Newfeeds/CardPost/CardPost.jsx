import React from "react";
import Moment from "react-moment";
import "moment/locale/fr";
import { useState, useRef } from "react";
import axios from "axios";
import { UidContext } from "../../../AppContext";
import { useContext } from "react";
import Author from "./Author";
import CreateCom from "../CardPost/CardCom/CreateCom";
import CardCom from "../CardPost/CardCom/CardComs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faFile, faTrash } from "@fortawesome/free-solid-svg-icons";

const CardPost = ({ post }) => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(post.content);
  const [pictureUpdate, setPictureUpdate] = useState(post.attachment);
  const fileInputRef = useRef();

  const uid = useContext(UidContext);

  const user = document.cookie;

  const jwt = user.split("=");
  const config = {
    headers: {
      authorization: `bearer ${jwt[1]}`,
    },
  };

  const updateItem = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("content", textUpdate);
    formData.append("attachment", pictureUpdate);

    console.log(formData);

    await axios
      .put(
        `${process.env.REACT_APP_API_URL}api/post/update/${post.id}`,
        formData,
        config
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    window.location.reload();
  };

  const deletePost = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}api/post/${post.id}`, config)
      .then(() => console.log("post effacé"))
      .catch((err) => console.log(err));

    window.location.reload();
  };

  return (
    <div className="post-card">
      <div className="publication-user">
        <Author post={post} />
        <p className="date-post">
          <Moment local="fr" fromNow>
            {post.createdAt}
          </Moment>
        </p>
      </div>

      {isUpdated === false && (
        <div className="post">
          <p className="post-content">{post.content}</p>
          {post.attachment ? (
            <div className="center">
              {" "}
              <img className="picture" src={post.attachment} alt="user" />{" "}
            </div>
          ) : null}
        </div>
      )}

      {isUpdated === true && (
        <div className="update-post-container">
          <textarea
            defaultValue={post.content}
            onChange={(e) => {
              setTextUpdate(e.target.value);
            }}
            id="picture"
            className="new-post"
          />

          {post.attachment ? (
            <div>
              <img src={post.attachment} alt="user" />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setPictureUpdate("");
                }}
              >
                Supprimé
              </button>
            </div>
          ) : null}

          <div className="update-file">
            <input
              type="file"
              name="attachment"
              onChange={(e) => {
                setPictureUpdate(e.target.files[0]);
              }}
              ref={fileInputRef}
            />

            <label htmlFor="picture" className="update-picture">
              modifier
            </label>

            <button onClick={updateItem} className="check-update">
              <FontAwesomeIcon className="size" icon={faCheck} />
            </button>
          </div>
        </div>
      )}
      <div className="option-post">
        {post.UserId === uid && (
          <button
            onClick={() => setIsUpdated(!isUpdated)}
            className="update-post"
          >
            <FontAwesomeIcon icon={faFile} />
          </button>
        )}
        {post.UserId === uid && (
          <button onClick={deletePost} className="update-post">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        )}
      </div>
      <p className="commentaire">Commentaires</p>
      <CreateCom post={post} />
      <ul>
        <CardCom post={post} />
      </ul>
    </div>
  );
};

export default CardPost;
