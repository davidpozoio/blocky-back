const { Router } = require("express");
const {
  login,
  signup,
  logout,
  requireAuth,
  authenticate,
} = require("../controllers/auth-controller");
const { stringValidator } = require("../validations/string-validator");

const router = Router();

router
  .route("/login")
  .post([stringValidator("username"), stringValidator("password")], login);

router
  .route("/signup")
  .post(
    [
      stringValidator("username"),
      stringValidator("password")
        .isLength({ min: 8 })
        .withMessage("the password must have 8 digits"),
    ],
    signup
  );

router.route("/logout").get(requireAuth, logout);

router.route("/me").get(authenticate);

module.exports = router;
