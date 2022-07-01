const model = require("../models");
const modelLike = model.Like;
const modelPost = model.Post;

exports.getAllLike = (req, res) => {
  modelLike
    .findAll()
    .then((like) => res.status(200).json(like))
    .catch((err) => res.status(400).json({ err }));
};
exports.createLike = (req, res) => {
  try {
    const postId = req.params.id;

    if (postId <= 0) {
      return res.status(400).json({ error: "post introuvable" });
    }
    modelPost
      .findOne({ where: { id: postId } })
      .then((foundPost) => {
        if (!foundPost) {
          return res.status(400).json({ error: "post non trouvée" });
        } else {
          const like = new modelLike({
            likes: req.body.like,
            PostId: postId,
            UserId: req.auth.userId,
          });
          console.log(like);
          like
            .save()
            .then(() => res.status(200).json({ message: "liké" }))
            .catch((err) => res.status(400).json({ err }));
        }
      })
      .catch((err) => res.status(400).json({ err }));
  } catch (err) {
    res.status(500).send(err);
  }
};
exports.unlike = (req, res) => {};
