const ERROR_CODES = require("../consts/error-codes");
const {
  findAllNotesByUserId,
  createNewNote,
  markDeleteNote,
  markNotDeleteNote,
  deleteNote,
  updateNote,
  findNoteById,
  deleteAllOldNotes,
} = require("../models/note-model");
const HttpError = require("../utils/error-optional");

class NoteService {
  async findAllByUserId(userId) {
    return findAllNotesByUserId(userId);
  }

  async findById(id, userId) {
    const note = await findNoteById(id, userId);
    if (!note)
      throw new HttpError(
        ERROR_CODES.E1003.MESSAGE,
        404,
        ERROR_CODES.E1003.CODE
      );
    return note;
  }

  async create({ title, content, userId }) {
    return createNewNote({ title, content, userId });
  }

  async markDeleted(id, userId) {
    return markDeleteNote(id, userId).then((res) => {
      if (res === 0) {
        throw new HttpError(
          ERROR_CODES.E1002.MESSAGE,
          404,
          ERROR_CODES.E1002.CODE
        );
      }
    });
  }

  async markNotDeleted(id, userId) {
    return markNotDeleteNote(id, userId).then((res) => {
      if (res === 0) {
        throw new HttpError(
          ERROR_CODES.E1002.MESSAGE,
          404,
          ERROR_CODES.E1002.CODE
        );
      }
    });
  }

  async delete(id, userId) {
    return deleteNote(id, userId).then((res) => {
      if (res === 0) {
        throw new HttpError(
          ERROR_CODES.E1002.MESSAGE,
          404,
          ERROR_CODES.E1002.CODE
        );
      }
    });
  }

  async update({ title, content, noteId, userId }) {
    return updateNote({ title, content, noteId, userId }).then((res) => {
      if (res === 0) {
        throw new HttpError(
          ERROR_CODES.E1002.MESSAGE,
          404,
          ERROR_CODES.E1002.CODE
        );
      }
    });
  }

  async deleteOldNotes() {
    return deleteAllOldNotes();
  }
}

const noteService = new NoteService();

module.exports = noteService;
