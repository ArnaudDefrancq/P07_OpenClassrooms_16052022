import React, { useEffect } from "react";
import Moment from "react-moment";
import "moment/locale/fr";
import { useState } from "react";
import axios from "axios";
import { UidContext } from "../../../AppContext";
import { useContext } from "react";
import Author from "./Author";
import CreateCom from "../CardPost/CardCom/CreateCom";
import CardCom from "../CardPost/CardCom/CardComs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEllipsis,
  faFile,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const CardPost = ({ post, userAdmin }) => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(post.content);
  const [pictureUpdate, setPictureUpdate] = useState(post.attachment);
  const [deletePicture, setDeletePicture] = useState(false);
  const [newPicture, setNewPicture] = useState();
  const [preview, setPreview] = useState();

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

    document.location.reload();
  };

  useEffect(() => {
    if (newPicture) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(newPicture);
    } else {
      setPreview(null);
    }
  }, [newPicture]);

  return (
    <div className="post-card">
      <div className="publication-user">
        <Author post={post} />
        <p className="date">
          {"Publié "}
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
              <img className="picture" src={pictureUpdate} alt="user" />{" "}
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

          {pictureUpdate ? (
            <div className="preview-picture">
              {deletePicture ? (
                <img src={preview} alt="new" className="picture-update " />
              ) : (
                <img
                  src={pictureUpdate}
                  alt="user"
                  className="picture-update "
                />
              )}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setPictureUpdate("");
                  setDeletePicture(true);
                }}
                className="delete-picture"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
          ) : null}

          <div className="update-file">
            <input
              type="file"
              name="attachment"
              onChange={(e) => {
                setPictureUpdate(e.target.files[0]);
                setNewPicture(e.target.files[0]);
              }}
              accept=".jpg, .jpeg, .png, .gif"
            />

            <button onClick={updateItem} className="check-update">
              <FontAwesomeIcon className="size" icon={faCheck} />
            </button>
          </div>
        </div>
      )}
      <div className="option-post-1">
        {post.UserId === uid && (
          <button
            onClick={() => setIsUpdated(!isUpdated)}
            className="update-post"
          >
            <FontAwesomeIcon icon={faFile} />
          </button>
        )}
        {post.UserId === uid || userAdmin ? (
          <button onClick={deletePost} className="update-post delete-post">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        ) : null}
      </div>
      <div className="option-post-2">
        {post.UserId === uid || userAdmin ? (
          <nav className="navbar-update">
            <button className="nav-update">
              <FontAwesomeIcon icon={faEllipsis} />
            </button>
            <ul className="btn-update">
              <li>
                <button
                  onClick={() => setIsUpdated(!isUpdated)}
                  className="update-post"
                >
                  <FontAwesomeIcon icon={faFile} />
                </button>
              </li>
              <li>
                <button
                  onClick={deletePost}
                  className="update-post delete-post"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </li>
            </ul>
          </nav>
        ) : null}
      </div>
      <p className="commentaire">Commentaires</p>
      <ul className="card-com-container">
        <CardCom post={post} userAdmin={userAdmin} />
      </ul>
      <CreateCom post={post} />
    </div>
  );
};

export default CardPost;
