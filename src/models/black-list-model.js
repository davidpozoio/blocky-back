const db = require("../config/postgress-config");

exports.createNewBlackListedToken = (token) => {
  return db.query("INSERT INTO blacklist (token) VALUES ($1)", [token]);
};

exports.findBlackListedToken = (token) => {
  return db
    .query("SELECT * FROM blacklist WHERE token = $1", [token])
    .then((res) => res.rows[0]);
};
