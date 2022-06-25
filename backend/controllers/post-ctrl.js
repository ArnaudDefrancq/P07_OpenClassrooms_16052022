const model = require("../models");
const modelPost = model.Post;
const modelUser = model.User;

exports.createPost = (req, res) => {
  delete req.body.id;
  const newPost = new modelPost({
    ...req.body,
    UserId: req.auth.userId,
  });

  newPost
    .save()
    .then(() => res.status(201).json({ message: "objet créer" }))
    .catch((err) => res.status(400).json({ err }));
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
