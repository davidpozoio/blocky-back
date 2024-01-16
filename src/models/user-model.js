const db = require("../config/postgress-config");
const { genSalt, hash, compare } = require("bcrypt");

exports.findByUsername = async (username) => {
  return db
    .query("SELECT * FROM users WHERE username = $1", [username])
    .then((res) => {
      return res.rows[0];
    });
};

exports.findAllUsers = async () => {
  return db.query("SELECT * FROM users").then((res) => {
    return res.rows;
  });
};

exports.createUser = async (username, passsword) => {
  const salt = await genSalt();
  passsword = await hash(passsword, salt);
  return db.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
    username,
    passsword,
  ]);
};

exports.comparePassword = (password, encryptPassword) => {
  return compare(password, encryptPassword);
};
