const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  console.log("TOKEN,", token);

  if (!token) {
    return res.status(401).json({ message: "0 token" });
  }

  const decodedToken = jwt.verify(token, process.env.TOKEN);

  const userId = decodedToken.userId;
  req.auth = { userId };
  next();
};

module.exports = checkToken;
