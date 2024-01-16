const { findByUsername, comparePassword } = require("../models/user-model");
const HttpError = require("../utils/error-optional");
const userService = require("./user-service");

class AuthService {
  async login(username, password) {
    //find user by username
    const user = await findByUsername(username);
    if (!user) {
      throw new HttpError("username is incorrect", 404);
    }
    //compare passwords
    const isAuth = await comparePassword(password, user.password);
    if (!isAuth) {
      throw new HttpError("password is incorrect", 401);
    }

    return user;
  }

  async signup(username, password) {
    return userService.create(username, password);
  }
}

const authService = new AuthService();

module.exports = authService;
