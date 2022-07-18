const model = require("../models");
const modelUser = model.User;
const modelCom = model.Comment;
const modelPost = model.Post;
const bcryp = require("bcrypt");
const fs = require("fs");
const { post } = require("../routes/auth-route");

exports.findOneUser = (req, res) => {
  modelUser
    .findOne({ where: { id: req.params.id } })
    .then((user) => {
      if (user.id !== req.auth.userId) {
        res.status(401).json({ message: "requête non autorisé" });
      } else {
        res.status(200).json(user);
      }
    })
    .catch((err) => res.status(400).json({ err }));
};
exports.updateUser = async (req, res) => {
  const { password } = req.body;

  const newUser = password
    ? {
        ...req.body,
        password: await bcryp.hash(password, 10),
      }
    : {
        ...req.body,
      };

  modelUser
    .findOne({ where: { id: req.params.id } })
    .then((user) => {
      if (user.id !== req.auth.userId) {
        res.status(401).json({ message: "requête non autorisé" });
      } else {
        modelUser
          .update(newUser, { where: { id: req.params.id } })
          .then(() => res.status(200).json({ message: "profil modifié" }))
          .catch((err) =>
            res.status(400).json({ message: "probleme la", err })
          );
      }
    })
    .catch((err) => res.status(400).json({ message: "probleme", err }));
};
exports.deleteUser = async (req, res) => {
  try {
    const user = await modelUser.findOne({
      where: {
        id: req.params.id,
      },
    });
    console.log(user);

    if (user.id !== req.auth.userId) {
      console.log("bonjour");
      return res.status(401).json({ message: "non autorisé" });
    } else {
      user
        .destroy({ where: { id: user.id } })
        .then(() => res.status(200).json({ message: "user delete" }))
        .catch((err) => res.status(400).json({ err }));
    }
  } catch (err) {
    res.status(500).json({ err });
  }
};
