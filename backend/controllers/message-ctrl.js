const models = require("../models");
const message = models.Message;

// Création d'un message
exports.createMeassage = (req, res, next) => {
  const { title, content } = req.body;

  if (title == null || content == null) {
    return res.status(400).json({ error: "Veuillez remplire tous les champs" });
  }

  const newMessage = new message({
    ...req.body,
  });

  newMessage
    .save()
    .then(() => res.status(201).json({ message: "Article créé !" }))
    .catch((error) => res.status(400).json({ error }));
};

// Lire tous les messages
exports.findAllMessage = (req, res, next) => {
  message
    .findAll({ order: [["createdAt", "DESC"]] })
    .then((messages) => {
      console.log(messages);
      res.status(200).json({ data: messages });
    })
    .catch((err) => res.status(400).json({ err }));
};
