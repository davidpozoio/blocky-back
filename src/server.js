const app = require("./app");
const { startDB } = require("./db-migration/db");
const port = process.env.PORT || 8000;

startDB()
  .then(() => {
    console.log("database has started");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.listen(port, () => {
  console.log("server has started in port " + port);
});

process.on("uncaughtException", (err) => {
  console.log(err);
});
