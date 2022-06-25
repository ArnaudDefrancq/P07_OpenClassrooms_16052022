//Import
const bcrypt = require("bcrypt");
const models = require("../models");
const userModel = models.User;
const jwt = require("jsonwebtoken");
const fs = require("fs");

// Voir tout les user
exports.allUsers = (req, res) => {
  userModel
    .findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => res.status(400).json({ err }));
};

//Création d'un user
exports.signup = (req, res) => {
  // Valider les paramètres de la requète
  const { email, pseudo, password } = req.body;

  if (email == null || pseudo == null || password == null) {
    res.status(400).json({ error: "il manque un paramètre" });
  }

  userModel
    .findOne({
      attributes: ["email"],
      where: { email: email },
    })
    .then((user) => {
      if (!user) {
        bcrypt
          .hash(password, 10)
          .then((hash) => {
            const newUser = new userModel({
              ...req.body,
              password: hash,
            });
            newUser
              .save()
              .then(() => res.status(201).json({ message: "Utilisateur crée" }))
              .catch((error) => res.status(400).json({ error }));
          })
          .catch((err) => {
            res.status(500).json({ err });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

//Login d'un user
exports.login = (req, res) => {
  //Récupération et validation des paramètres
  const { email, password } = req.body;
  if (email == null || password == null) {
    res.status(400).json({ error: "Il manque un paramètre" });
  }
  //Vérification si user existe
  userModel
    .findOne({
      where: { email: email },
    })
    .then((user) => {
      if (user) {
        bcrypt
          .compare(password, user.password)
          .then((valid) => {
            if (!valid) {
              return res.status(401).json({ error: "mauvais MDP" });
            }
            res.cookie(
              "jwt",
              jwt.sign({ userId: user.id }, process.env.TOKEN, {
                expiresIn: "1h",
              })
            );
            res.status(200).json({
              userId: user.id,
              token: jwt.sign({ userId: user.id }, process.env.TOKEN, {
                expiresIn: "1h",
              }),
            });
          })
          .catch((err) => {
            return res.status(500).json({ err });
          });
      } else {
        res.status(404).json({ erreur: "Cet utilisateur n'existe pas" });
      }
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};
