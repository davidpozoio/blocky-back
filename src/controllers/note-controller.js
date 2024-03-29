const ERROR_CODES = require("../consts/error-codes");
const { findAllNotes } = require("../models/note-model");
const noteService = require("../services/note-service");
const { asyncErrorHandler } = require("../utils/async-error-handler");
const HttpError = require("../utils/error-optional");

exports.getAllNotes = asyncErrorHandler(async (req, res) => {
  const notes = await findAllNotes();

  res.status(200).json({
    notes,
  });
});

exports.getNoteById = asyncErrorHandler(async (req, res) => {
  const decodedToken = req.decodedToken;
  const note = await noteService.findById(req.params.id, decodedToken.id);
  res.status(200).json({
    note,
    message: "success",
  });
});

exports.getAllNotesByMe = asyncErrorHandler(async (req, res) => {
  const deleted = req.query.deleted === "true";
  const decodedToken = req.decodedToken;
  const myNotes = await noteService.findAllByUserId(decodedToken.id);

  if (deleted) {
    return res.status(200).json({
      notes: myNotes.filter((note) => note.is_deleting),
    });
  }

  res.status(200).json({
    notes: myNotes.filter((note) => !note.is_deleting),
  });
});

exports.createNewNoteByMe = asyncErrorHandler(async (req, res) => {
  const decodedToken = req.decodedToken;

  const createdNote = await noteService.create({
    title: req.body.title,
    content: req.body.content,
    userId: decodedToken.id,
  });

  res.status(201).json({
    note: {
      id: createdNote.id,
      title: req.body.title,
      content: req.body.content,
      userId: decodedToken.id,
    },
    message: "note created!!",
  });
});

exports.changeDeleteNoteState = asyncErrorHandler(async (req, res) => {
  const isInTrash = req.params.isInTrash === "true";
  const noteId = req.params.noteId;
  const decodedToken = req.decodedToken;

  if (isInTrash) {
    await noteService.markDeleted(noteId, decodedToken.id);
    return res.status(200).json({
      message: "delete status changed to true successfully",
    });
  }

  await noteService.markNotDeleted(noteId, decodedToken.id);
  res.status(200).json({
    message: "delete status changed to false successfully",
  });
});

exports.deleteNote = asyncErrorHandler(async (req, res) => {
  const noteId = req.params.noteId;
  const decodedToken = req.decodedToken;
  await noteService.delete(noteId, decodedToken.id);

  res.status(200).json({
    message: "note deleted successfully",
  });
});

exports.updateNote = asyncErrorHandler(async (req, res) => {
  const decodedToken = req.decodedToken;
  const note = await noteService.findById(req.params.id, decodedToken.id);
  if (note.is_deleting) {
    throw new HttpError(ERROR_CODES.E1000.MESSAGE, 400, ERROR_CODES.E1000.CODE);
  }
  await noteService.update({
    ...req.body,
    noteId: req.params.id,
    userId: decodedToken.id,
  });

  res.status(200).json({
    message: "updated note successfully",
  });
});
