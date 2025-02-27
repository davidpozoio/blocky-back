const db = require("../config/postgress-config");
const { genSalt, hash, compare } = require("bcryptjs");

exports.findByUsername = async (username) => {
  return db
    .query("SELECT * FROM users WHERE username = $1", [username])
    .then((res) => {
      return res.rows[0];
    });
};

exports.findUserById = async (id) => {
  return db.query("SELECT * FROM users WHERE id = $1", [id]).then((res) => {
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

  return db
    .query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
      [username, passsword]
    )
    .then((res) => res.rows[0]);
};

exports.comparePassword = (password, encryptPassword) => {
  return compare(password, encryptPassword);
};
