const pool = require("../config/postgress-config");
const delay = require("../utils/delay");

const testConnection = async ({ maxRetries = 2, time = 1000 }) => {
  let tries = 0;
  while (true) {
    await delay(time);
    console.log("testing connection...");
    try {
      await pool.query("SELECT 1");
      break;
    } catch (error) {
      tries++;
      if (tries === maxRetries) {
        throw Error("error to connect to database");
      }
    }
  }
};

module.exports = testConnection;
