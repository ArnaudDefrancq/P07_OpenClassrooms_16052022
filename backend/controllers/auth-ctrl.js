const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const model = require("../models");
require("dotenv").config();
const User = model.user;

exports.signup = async (req, res, next) => {
  const { email, password, username } = req.body;
  console.log(email, password, username);

  if (email == null || username == null || password == null) {
    return res.status(400).json({ error: "missing parameters" });
  }

  const salt = await bcrypt.genSalt(10);
  const bcryptPassword = await bcrypt.hash(password, salt);

  const newUser = {
    ...req.body,
    password: bcryptPassword,
  };

  User.findOne({
    where: { email: email },
  })
    .then((user) => {
      if (!user) {
        User.create(newUser)
          .then(() => {
            res.status(201).json({ message: "Registered" });
          })
          .catch((err) => res.send("err" + err));
      } else {
        res.json({ message: "user already exist" });
      }
    })
    .catch((err) => res.status(500).json({ message: "Problème", err }));
};
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (email == null || password == null) {
    return res.status(400).json({ error: "missing parameters" });
  }

  User.findOne({
    where: { email: email },
  })
    .then((userFound) => {
      if (userFound) {
        bcrypt
          .compare(password, userFound.password)
          .then((valid) => {
            if (!valid) {
              return res.status(401).json({ message: "mot de pass incorrect" });
            }
            return res.status(200).json({
              user: userFound.id,
              token: jwt.sign({ userId: userFound.id }, process.env.TOKEN, {
                expiresIn: "24h",
              }),
            });
          })
          .catch((err) => res.status(500).json({ err }));
      }
    })
    .catch((err) =>
      res.status(500).json({ error: "unable to verify user", err })
    );
};
