const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const Secret = process.env.SECRET_KEY;

function getToken() {
  const token = jwt.sign({admin:'admin'}, Secret, {  });
  return token;
}
function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    res.status(403).json({ msg: "no token " });
  }
  try {
    jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    return res.json({
      msg: "Invalid Token",
    });
  }
  next();
}
module.exports = { getToken, verifyToken };
