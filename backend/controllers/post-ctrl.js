const post = require("../models/Post.model");
const ObjectID = require("mongoose").Types.ObjectId;

exports.findAllPost = (req, res, next) => {
  post
    .find((err, docs) => {
      if (!err) res.send(docs);
      else console.log("error to get data" + err);
    })
    .sort({ createdAt: -1 });
};

exports.createPost = async (req, res, next) => {
  const newPost = new post({
    posterId: req.body.posterId,
    message: req.body.message,
    image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    video: req.body.video,
    likers: [""],
    comments: [""],
  });

  try {
    const post = await newPost.save();
    return res.status(201).json({ post });
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.modifyPost = (req, res, next) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("id unknow : " + req.params.id);
  }

  const updatedPost = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  post.findByIdAndUpdate(
    req.params.id,
    {
      $set: updatedPost,
    },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("update error" + err);
    }
  );
};

exports.deletePost = (req, res, next) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("id unknow : " + req.params.id);
  }

  post.findByIdAndDelete(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("error", err);
  });
};

exports.likePost = async (req, res, next) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("id unknow : " + req.params.id);
  }

  try {
    await post.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likers: req.body.id },
      },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).send(err);
      }
    );
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.unlikePost = async (req, res, next) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("id unknow : " + req.params.id);
  }

  try {
    await post.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likers: req.body.id },
      },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).send(err);
      }
    );
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.commentPost = (req, res, next) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return post.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

exports.editCommentPost = (req, res, next) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return post.findById(req.params.id, (err, docs) => {
      const theComment = docs.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );

      if (!theComment) return res.status(404).send("Comment not found");
      theComment.text = req.body.text;

      return docs.save((err) => {
        if (!err) return res.status(200).send(docs);
        return res.status(500).send(err);
      });
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.deleteCommentPost = (req, res, next) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return post.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};
