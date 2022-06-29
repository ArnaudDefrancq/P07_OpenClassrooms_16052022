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
        pseudo: req.auth.userPseudo,
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
        pseudo: req.auth.userPseudo,
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
  const newPost = req.file
    ? {
        content: req.body,
        attachment: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
        UserId: req.auth.userId,
      }
    : {
        content: req.body.content,
        UserId: req.auth.userId,
      };

  console.log(newPost);

  modelPost
    .findOne({ where: { id: req.params.id } })
    .then((post) => {
      if (!post) {
        return res.status(400).json({ message: "post non trouvé" });
      }
      post
        .update({ ...newPost })
        .then((posted) =>
          res.status(200).json({ message: "post modifier", posted })
        )
        .catch((err) => res.status(400).json({ err }));
    })
    .catch((err) => res.status(400).json({ err }));
};

exports.deletePost = (req, res) => {
  modelPost
    .destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "post effacé" }))
    .catch((err) => res.status(400).json({ err }));
};
