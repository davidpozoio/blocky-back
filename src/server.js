const app = require("./app");
const { startDB } = require("./db-migration/db");
const cron = require("node-cron");
const noteService = require("./services/note-service");
const port = process.env.PORT || 8000;

startDB()
  .then(() => {
    console.log("database has started");
  })
  .catch((err) => {
    console.log(err.message);
  })
  .finally(() => {
    cron.schedule("0 0 * * * *", async () => {
      await noteService.deleteOldNotes();
    });
  });

app.listen(port, () => {
  console.log("server has started in port " + port);
});

process.on("uncaughtException", (err) => {
  console.log(err);
});
