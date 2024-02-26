const db = require("../config/postgress-config");
const HttpError = require("../utils/error-optional");

exports.findAllNotes = () => {
  return db.query("SELECT * FROM note").then((res) => {
    return res.rows;
  });
};

exports.findNoteById = (id, userId) => {
  return db
    .query("SELECT * FROM note WHERE id = $1 AND user_id = $2", [id, userId])
    .then((res) => {
      return res.rows[0];
    });
};

exports.findAllNotesByUserId = (userId) => {
  return db
    .query("SELECT * FROM note WHERE user_id = $1", [userId])
    .then((res) => {
      return res.rows;
    });
};

exports.createNewNote = ({ title, content, userId }) => {
  return db
    .query(
      `INSERT INTO note (title, content, is_deleting, delete_date, user_id)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
      [title, content, false, new Date().toISOString(), userId]
    )
    .then((res) => res.rows[0]);
};

exports.markDeleteNote = (noteId, userId) => {
  return db
    .query(
      "UPDATE note SET is_deleting = true, delete_date = $1 WHERE id = $2 AND user_id = $3",
      [new Date(), noteId, userId]
    )
    .then((res) => res.rowCount);
};

exports.markNotDeleteNote = (noteId, userId) => {
  return db
    .query(
      "UPDATE note SET is_deleting = false WHERE id = $1 AND user_id = $2",
      [noteId, userId]
    )
    .then((res) => res.rowCount);
};

exports.deleteNote = (noteId, userId) => {
  return db
    .query("DELETE FROM note WHERE id = $1 AND user_id = $2", [noteId, userId])
    .then((res) => res.rowCount);
};

exports.updateNote = ({ title, content, noteId, userId }) => {
  if ((title || title === "") && (content || content === "")) {
    return db
      .query(
        "UPDATE note SET title = $1, content = $2 WHERE id = $3 AND user_id = $4",
        [title, content, noteId, userId]
      )
      .then((res) => res.rowCount);
  }

  if (title || title === "") {
    return db
      .query("UPDATE note SET title = $1 WHERE id = $2 AND user_id = $3", [
        title,
        noteId,
        userId,
      ])
      .then((res) => res.rowCount);
  }

  if (content || content === "") {
    return db
      .query("UPDATE note SET content = $1 WHERE id = $2 AND user_id = $3", [
        content,
        noteId,
        userId,
      ])
      .then((res) => res.rowCount);
  }

  if (!title && !content) {
    throw new HttpError("you must put a title or a content", 400);
  }
};

exports.deleteAllOldNotes = () => {
  return db.query(
    `DELETE FROM note WHERE is_deleting = TRUE
  AND delete_date < CURRENT_DATE - INTERVAL '$1'`,
    [process.env.LIVE_TIME || "2 day"]
  );
};
