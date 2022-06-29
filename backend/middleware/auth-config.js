const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  console.log("TOKEN,", token);

  if (!token) {
    return res.status(401).json({ message: "0 token" });
  }

  const decodedToken = jwt.verify(token, process.env.TOKEN);
  console.log(decodedToken);

  const userId = decodedToken.userId;
  const userPseudo = decodedToken.userPseudo;

  req.auth = { userId: userId, userPseudo: userPseudo };

  console.log(req.auth);

  next();
};

module.exports = checkToken;
