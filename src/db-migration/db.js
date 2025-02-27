const fs = require("fs/promises");
const db = require("../config/postgress-config");

exports.startDB = () => {
  return fs.readdir("src/db-migration").then((files) => {
    files.forEach(async (file) => {
      if (file.match(/(db.js)|(test-connection.js)/)) return;
      const sql = await fs.readFile(`src/db-migration/${file}`, {
        encoding: "utf-8",
      });
      await db.query(sql);
    });
  });
};
