const model = require("../models");
const modelPost = model.Post;
const modelCom = model.Comment;
const modelUser = model.User;
const fs = require("fs");

exports.createPost = async (req, res) => {
  try {
    const userId = await modelUser.findOne({ where: { id: req.auth.userId } });
    if (userId.id === req.auth.userId) {
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
            res.status(201).json({
              message: "Publication avec photo envoyée avec succés",
              post,
            })
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
            res
              .status(201)
              .json({ message: "Message publié avec succés", post })
          )
          .catch((error) => {
            res.status(500).json(error);
          });
      }
    } else {
      return res.status(401).json({ error: "Aucune autorisation" });
    }
  } catch {
    return res.status(400).json({ error: "petit probleme" });
  }
};

exports.getAllPosts = (req, res) => {
  modelPost
    .findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: modelUser,
          attributes: ["id", "pseudo", "isAdmin"],
        },
        {
          model: modelCom,
          attributes: ["id", "content", "UserId", "createdAt"],
          include: [
            {
              model: modelUser,
              attributes: ["id", "pseudo"],
            },
          ],
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

exports.deletePost = async (req, res) => {
  try {
    const post = await modelPost.findOne({ where: { id: req.params.id } });
    const user = await modelUser.findOne({ where: { id: req.auth.userId } });
    console.log(user.isAdmin);
    if (post.UserId === req.auth.userId || user.isAdmin !== null) {
      modelCom.destroy({ where: { PostId: post.id } }).then(() => {
        if (post.attachment) {
          const filename = post.attachment.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {
            modelPost
              .destroy({ where: { id: post.id } })
              .then(() => res.status(200).json({ message: "post éffacé" }))
              .catch((err) =>
                res.status(400).json({ err, error: "post non détruit" })
              );
          });
        } else {
          modelPost
            .destroy({ where: { id: post.id } }, { truncate: true })
            .then(() =>
              res.status(200).json({ message: "Publication supprimée." })
            )
            .catch((err) =>
              res.status(400).json({ error: "post non trouvé", err })
            );
        }
      });
    } else {
      return res.status(400).json({ error: "requête non autorisée" });
    }
  } catch (error) {
    res.status(400).json({ error: "post non trouvé ici", error });
  }
};
