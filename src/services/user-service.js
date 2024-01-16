const { findAllUsers, createUser } = require("../models/user-model");
const HttpError = require("../utils/error-optional");

class UserService {
  async findAll() {
    return findAllUsers();
  }

  async create(username, password) {
    return createUser(username, password).catch((err) => {
      if (err.code == "23505") {
        throw new HttpError("the username has already taken", 404);
      }
    });
  }
}

const userService = new UserService();

module.exports = userService;
