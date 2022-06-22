const jwt = require("jsonwebtoken");

// const extractBearer = (auth) => {
//   if (typeof auth !== "string") {
//     return false;
//   }

//   const matches = auth.match(/(bearer)\s+(\S+)/i);

//   return matches && matches[2];
// };

const checkToken = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log("AUTH", req.headers);
  console.log("TOKEN,", token);

  if (!token) {
    return res.status(401).json({ message: "0 token" });
  }

  jwt.verify(token, process.env.TOKEN, (err, decoded) => {
    const userIdToken = decoded.userId;
    req.auth = { userId: userIdToken };
    req.auth;
    console.log(userIdToken);
    if (err) {
      return res.status(401).json({ message: "mauvais token" });
    }

    next();
  });
};

module.exports = checkToken;
