const ERROR_CODES = require("../consts/error-codes");
const { findByUsername, comparePassword } = require("../models/user-model");
const HttpError = require("../utils/error-optional");
const userService = require("./user-service");

class AuthService {
  async login(username, password) {
    //find user by username
    const user = await findByUsername(username);
    if (!user) {
      throw new HttpError(
        ERROR_CODES.E2000.MESSAGE,
        404,
        ERROR_CODES.E2000.CODE
      );
    }
    //compare passwords
    const isAuth = await comparePassword(password, user.password);
    if (!isAuth) {
      throw new HttpError(
        ERROR_CODES.E2001.MESSAGE,
        401,
        ERROR_CODES.E2001.CODE
      );
    }

    return user;
  }

  async signup(username, password) {
    return userService.create(username, password);
  }
}

const authService = new AuthService();

module.exports = authService;
