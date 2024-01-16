const app = require("./app");
const { startDB } = require("./db-migration/db");

startDB()
  .then(() => {
    console.log("database has started");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.listen(8000, () => {
  console.log("server has started");
});
