const ERROR_CODES = require("../consts/error-codes");
const {
  findAllUsers,
  createUser,
  findUserById,
} = require("../models/user-model");
const HttpError = require("../utils/error-optional");

class UserService {
  async findAll() {
    return findAllUsers();
  }

  async findById(id) {
    const user = await findUserById(id);
    if (!user) {
      throw new HttpError(`there is no user with that id: ${id}`, 404);
    }
    return user;
  }

  async create(username, password) {
    return createUser(username, password).catch((err) => {
      if (err.code == "23505") {
        throw new HttpError(
          ERROR_CODES.E2002.MESSAGE,
          404,
          ERROR_CODES.E2002.CODE
        );
      }
    });
  }
}

const userService = new UserService();

module.exports = userService;
