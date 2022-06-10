// const models = require("../models");

// const message = models.Message;

// // Création d'un message
// exports.createMeassage = async (req, res, next) => {
//   const { title, content } = req.body;
//   // const userIdFound = await user.findOne({ where: { id: user.UserId } });

//   if (title == null || content == null) {
//     return res.status(400).json({ error: "Veuillez remplire tous les champs" });
//   }

//   const newMessage = new message({
//     ...req.body,
//     userId: req.auth.userId,
//   });

//   newMessage
//     .save()
//     .then(() => res.status(201).json({ message: "Article créé !" }))
//     .catch((error) => res.status(400).json({ error }));
// };

// // Lire tous les messages
// exports.findAllMessage = (req, res, next) => {
//   message
//     .findAll({ order: [["createdAt", "DESC"]] })
//     .then((messages) => {
//       console.log(messages);
//       res.status(200).json(message);
//     })
//     .catch((err) => res.status(400).json({ err }));
// };

// // Sélectionner un message
// exports.findOneMessage = (req, res, next) => {
//   message
//     .findOne({ where: { id: req.params.id } })
//     .then((message) => {
//       res.status(200).json({ message });
//     })
//     .catch((err) => res.status(404).json({ err }));
// };

// // Modifier un message
// exports.modifyMessage = (req, res, next) => {
//   const { title, content } = req.body;

//   if (title === null || content === null) {
//     return res.status(400).json({
//       error:
//         "Veuillez remplir les champs 'Titre' et 'Contenu' pour créer un article",
//     });
//   }

//   const articleObject = req.body;

//   message
//     .update(
//       { ...articleObject, id: req.params.id },
//       { where: { id: req.params.id } }
//     )
//     .then(() => res.status(200).json({ message: "Article modifié !" }))
//     .catch((error) => res.status(400).json({ error }));
// };
