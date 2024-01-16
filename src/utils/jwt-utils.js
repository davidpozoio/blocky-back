const { promisify } = require("util");
const jwt = require("jsonwebtoken");

exports.createToken = (payload) => {
  return promisify(jwt.sign)(payload, process.env.SECRET, { expiresIn: "1d" });
};

exports.verifyToken = (token) => {
  return promisify(jwt.verify)(token, process.env.SECRET);
};
