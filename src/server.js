const app = require("./app");
const { startDB } = require("./db-migration/db");
const cron = require("node-cron");
const noteService = require("./services/note-service");
const testConnection = require("./db-migration/test-connection");
const port = process.env.PORT || 8000;

testConnection({ maxRetries: 2, time: 1000 })
  .then(() =>
    startDB()
      .then(() => {
        console.log("database connected");
      })

      .finally(() => {
        cron.schedule("0 0 * * * *", async () => {
          await noteService.deleteOldNotes();
        });
      })
  )
  .catch(() => {
    console.log("error to connect database");
  });

app.listen(port, () => {
  console.log("server has started in port " + port);
});

process.on("uncaughtException", (err) => {
  console.log(err);
});
