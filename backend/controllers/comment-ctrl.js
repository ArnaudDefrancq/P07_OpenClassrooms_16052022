const model = require("../models");
const modelComs = model.Comment;
const modelPost = model.Post;

exports.createComs = (req, res) => {
  const comment = new modelComs({
    ...req.body,
    UserId: req.auth.userId,
    // PostId: req.body.id,
  });

  comment
    .save()
    .then(() => res.status(200).json({ message: "message créé" }))
    .catch((err) => res.status(400).json({ err }));
};

exports.getAllComs = (req, res) => {
  modelComs
    .findAll({ order: [["createdAt", "DESC"]] })
    .then((comments) => res.status(200).json(comments))
    .catch((err) => res.status(400).json({ err }));
};

exports.deleteCom = (req, res) => {};
