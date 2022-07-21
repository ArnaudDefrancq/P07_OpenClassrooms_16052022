const model = require("../models");
const modelComs = model.Comment;
const modelUser = model.User;
const modelPost = model.Post;

exports.createComs = async (req, res) => {
  try {
    const user = await modelUser.findOne({ where: { id: req.auth.userId } });
    const post = await modelPost.findOne({ where: { id: req.params.id } });

    const comment = new modelComs({
      ...req.body,
      UserId: user.id,
      PostId: post.id,
    });

    comment
      .save()
      .then(() => res.status(200).json({ message: "message créé" }))
      .catch((err) => res.status(400).json({ err }));
  } catch {
    return res.status(400).json({ error: "petit  probleme" });
  }
};

exports.getAllComs = (req, res) => {
  modelComs
    .findAll({
      where: { PostId: req.params.id },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: modelUser,
          attributes: ["id", "pseudo"],
        },
      ],
    })
    .then((comments) => res.status(200).json(comments))
    .catch((err) => res.status(400).json({ err }));
};

exports.updateCom = (req, res, next) => {
  const updateCom = { ...req.body };

  modelComs
    .update(updateCom, { where: { id: req.params.id } })
    .then((data) => res.status(200).json({ message: "com modifier", data }))
    .catch((err) => res.status(400).json({ err }));
};

exports.deleteCom = async (req, res) => {
  try {
    const user = await modelUser.findOne({ where: { id: req.auth.userId } });
    const com = await modelComs.findOne({ where: { id: req.params.id } });

    if (com.UserId === req.auth.userId || user.isAdmin) {
      console.log("bonjour");
      modelComs
        .destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: "com effacé" }))
        .catch((err) => res.status(400).json({ err }));
    } else {
      return res.status(401).json({ error: "Pas autorisé" });
    }
  } catch {
    return res.status(400).json({ error: "petit problème" });
  }
};
