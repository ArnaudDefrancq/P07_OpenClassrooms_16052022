const post = require("../models/Post.model");
const user = require("../models/User.model");
const ObjectID = require("mongoose").Types.ObjectId;

exports.findAllPost = (req, res, next) => {
  post.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("error to get data" + err);
  });
};

exports.createPost = async (req, res, next) => {
  const newPost = new post({
    posterId: req.body.posterId,
    message: req.body.message,
    image: req.body.image,
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

  const updatedPost = {
    message: req.body.message,
  };

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
