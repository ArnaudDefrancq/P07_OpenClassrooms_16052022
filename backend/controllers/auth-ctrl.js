const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req, res, next) => {
  try {
    await bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        const user = new User({
          ...req.body,
          password: hash,
        });
        user
          .save()
          .then(() =>
            res
              .status(201)
              .json({ message: "Utilisateur crée", userId: user._id })
          )
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  } catch (err) {
    return res.status(200).json({ err });
  }
};
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  await User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "utilisateur non trouver" });
      }
      bcrypt
        .compare(password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ message: "mot de passe incorrecte" });
          }
          res.status(200).json({
            message: "Connecter",
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.TOKEN, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((err) => res.status(500).json({ error: "probleme1", err }));
    })
    .catch((err) => res.status(500).json({ error: "probleme2", err }));
};

module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
