const { Router } = require("express");
const {
  login,
  signup,
  logout,
  requireAuth,
} = require("../controllers/auth-controller");
const { stringValidator } = require("../validations/string-validator");

const router = Router();

router
  .route("/login")
  .post([stringValidator("username"), stringValidator("password")], login);

router
  .route("/signup")
  .post([stringValidator("username"), stringValidator("password")], signup);

router.route("/logout").get(requireAuth, logout);

module.exports = router;
