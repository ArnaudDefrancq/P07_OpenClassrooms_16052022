const model = require("../models");
const modelPost = model.Post;
const fs = require("fs");

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
        ...req.body,
        attachment: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : {
        ...req.body,
      };

  console.log(newPost);

  modelPost
    .findOne({ where: { id: req.params.id } })
    .then((post) => {
      if (post.UserId !== req.auth.userId) {
        res.status(401).json({ message: "no autorisé" });
      } else {
        const filename = post.attachment.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          modelPost
            .update(newPost, { where: { id: req.params.id } })
            .then((data) =>
              res.status(200).json({ message: "post modifier", data })
            )
            .catch((err) => res.status(400).json({ err }));
        });
      }
    })
    .catch((err) => res.satus(400).json({ err }));
};

exports.deletePost = (req, res) => {
  modelPost
    .findOne({ where: { id: req.params.id } })
    .then((post) => {
      console.log(post.UserId);
      console.log(req.auth.userId);
      if (post.UserId !== req.auth.userId) {
        console.log("bonjour");
        res.status(401).json({ message: "pas autorisé" });
      } else {
        console.log("bonsoir");
        const filename = post.attachment.split("/images/")[1];
        console.log(filename);
        fs.unlink(`images/${filename}`, () => {
          modelPost
            .destroy({ where: { id: req.params.id } })
            .then(() => res.status(200).json({ message: "post effacé" }))
            .catch((err) =>
              res.status(400).json({ message: "probleme la", err })
            );
        });
      }
    })
    .catch((err) => res.status(400).json({ message: "probleme ici", err }));
};
