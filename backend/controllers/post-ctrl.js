const model = require("../models");
const modelPost = model.Post;
const modelUser = model.User;

exports.createPost = (req, res) => {
  if (req.file) {
    modelPost
      .create({
        content: req.body.content,
        attachment: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
        UserId: req.auth.userId,
      })
      .then((post) =>
        res
          .status(201)
          .json({ message: "Publication avec photo envoyée avec succés", post })
      )
      .catch((error) => {
        res.status(500).json(error);
      });
  } else {
    modelPost
      .create({
        content: req.body.content,
        UserId: req.auth.userId,
      })
      .then((post) =>
        res.status(201).json({ message: "Message publié avec succés", post })
      )
      .catch((error) => {
        res.status(500).json(error);
      });
  }
};

exports.getAllPosts = (req, res) => {
  modelPost
    .findAll({
      order: [["createdAt", "DESC"]],
    })
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => res.status(400).json({ err }));
};

exports.updatePost = (req, res) => {
  const postObject = req.body;

  modelPost
    .update(
      { ...postObject, id: req.params.id },
      { where: { id: req.params.id } }
    )
    .then(() => res.status(200).json({ message: "post modifier" }))
    .catch((err) => res.status(400).json({ err }));
};

exports.deletePost = (req, res) => {
  modelPost
    .destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "post effacé" }))
    .catch((err) => res.status(400).json({ err }));
};
