const userService = require("../services/user-service");
const { asyncErrorHandler } = require("../utils/async-error-handler");

exports.getAllUsers = asyncErrorHandler(async (req, res) => {
  const users = await userService.findAll();

  res.status(200).json({
    users,
  });
});
