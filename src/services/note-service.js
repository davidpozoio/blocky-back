const {
  findAllNotesByUserId,
  createNewNote,
  markDeleteNote,
  markNotDeleteNote,
  deleteNote,
  updateNote,
} = require("../models/note-model");
const HttpError = require("../utils/error-optional");

class NoteService {
  async findAllByUserId(userId) {
    return findAllNotesByUserId(userId);
  }

  async create({ title, content, userId }) {
    return createNewNote({ title, content, userId });
  }

  async markDeleted(id, userId) {
    return markDeleteNote(id, userId).then((res) => {
      if (res === 0) {
        throw new HttpError("note id doesn't exist", 404);
      }
    });
  }

  async markNotDeleted(id, userId) {
    return markNotDeleteNote(id, userId).then((res) => {
      if (res === 0) {
        throw new HttpError("note id doesn't exist", 404);
      }
    });
  }

  async delete(id, userId) {
    return deleteNote(id, userId).then((res) => {
      if (res === 0) {
        throw new HttpError("note id doesn't exist", 404);
      }
    });
  }

  async update({ title, content, noteId, userId }) {
    return updateNote({ title, content, noteId, userId }).then((res) => {
      if (res === 0) {
        throw new HttpError("note id doesn't exist", 404);
      }
    });
  }
}

const noteService = new NoteService();

module.exports = noteService;
