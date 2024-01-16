const { Router } = require("express");
const {
  /*   getAllNotes, */
  getAllNotesByMe,
  createNewNoteByMe,
  changeDeleteNoteState,
  deleteNote,
  updateNote,
} = require("../controllers/note-controller");
const { requireAuth } = require("../controllers/auth-controller");
const {
  noteValidator,
  notePatchValidator,
} = require("../validations/note-validator");
const { query, param } = require("express-validator");

const router = new Router();

/* router.route("/all").get(requireAuth, getAllNotes); */
router
  .route("/")
  .get(requireAuth, query("deleted").isBoolean().optional(), getAllNotesByMe)
  .post(requireAuth, noteValidator, createNewNoteByMe)
  .patch(requireAuth, notePatchValidator, updateNote);

router
  .route("/:noteId/:isInTrash")
  .patch(
    requireAuth,
    [
      param("noteId").isNumeric().notEmpty(),
      param("isInTrash").isBoolean().notEmpty(),
    ],
    changeDeleteNoteState
  );

router
  .route("/:noteId")
  .delete(requireAuth, param("noteId").isNumeric().notEmpty(), deleteNote);

module.exports = router;
