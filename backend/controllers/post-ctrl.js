const model = require("../models");
const modelPost = model.Post;
const modelCom = model.Comment;
const modelUser = model.User;
const fs = require("fs");

exports.createPost = async (req, res) => {
  const userId = await modelUser.findOne({ where: { id: req.auth.userId } });

  if (req.file) {
    modelPost
      .create({
        content: req.body.content,
        attachment: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
        UserId: userId.id,
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
        UserId: userId.id,
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
      include: [
        {
          model: modelUser,
          attributes: ["id", "pseudo"],
        },
        {
          model: modelCom,
          attributes: ["id", "content"],
        },
      ],
    })
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => res.status(400).json({ err }));
};

exports.updatePost = async (req, res) => {
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
  modelPost
    .findOne({ where: { id: req.params.id } })
    .then((post) => {
      if (post.UserId !== req.auth.userId) {
        res.status(401).json({ message: "no autorisé" });
      } else {
        // const filename = post.attachment.split("/images/")[1];
        // fs.unlink(`images/${filename}`, () => {
        modelPost
          .update(newPost, { where: { id: req.params.id } })
          .then((data) =>
            res.status(200).json({ message: "post modifier", data })
          )
          .catch((err) => res.status(400).json({ err }));
        // });
      }
    })
    .catch((err) => res.satus(400).json({ err }));
};

exports.deletePost = (req, res) => {
  modelPost
    .findOne({ where: { id: req.params.id } })
    .then((post) => {
      if (post.UserId !== req.auth.userId) {
        res.status(401).json({ message: "pas autorisé" });
      } else {
        modelCom
          .findAll({ where: { PostId: post.id } })
          .then((coms) => {
            if (coms) {
              modelCom
                .destroy({ where: { PostId: req.params.id } })
                .then(() => {
                  const filename = post.attachment.split("/images/")[1];
                  fs.unlink(`images/${filename}`, () => {
                    modelPost
                      .destroy({ where: { id: req.params.id } })
                      .then(() =>
                        res.status(200).json({ message: "post effacé" })
                      )
                      .catch((err) =>
                        res.status(400).json({ message: "probleme la", err })
                      );
                  });
                })
                .catch((err) =>
                  res.status(400).json({ message: "probleme là", err })
                );
            } else {
              console.log("bonsoir");
            }
          })
          .catch((err) => res.status(400).json({ err }));
      }
    })
    .catch((err) => res.status(400).json({ message: "probleme ici", err }));
};
