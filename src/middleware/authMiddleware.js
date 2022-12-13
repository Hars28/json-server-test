const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, "SECRET123");
    req.userData = { name: decodedToken.name, email: decodedToken.email, userId: decodedToken.id };
    next();
  } catch (error) {
    res.status(401).json({ message: "Auth failed!" });
  }
};