const ERROR_CODES = require("../consts/error-codes");
const NAMES = require("../consts/names");
const {
  findBlackListedToken,
  createNewBlackListedToken,
} = require("../models/black-list-model");
const authService = require("../services/auth-service");
const userService = require("../services/user-service");
const { asyncErrorHandler } = require("../utils/async-error-handler");
const HttpError = require("../utils/error-optional");

const { createToken, verifyToken } = require("../utils/jwt-utils");

exports.authenticate = asyncErrorHandler(async (req, res) => {
  const cookieJwt = req.cookies[NAMES.JWT];

  if (!cookieJwt) {
    throw new HttpError("jwt not provided", 404);
  }
  const decodedToken = await verifyToken(cookieJwt);
  console.log(decodedToken);
  const user = await userService.findById(decodedToken.id);
  user.password = undefined;
  res.status(200).json({
    user,
  });
});

exports.login = asyncErrorHandler(async (req, res) => {
  const user = await authService.login(req.body.username, req.body.password);

  const token = await createToken({ id: user.id });

  res.cookie(NAMES.JWT, token, {
    httpOnly: true,
    path: "/",
    secure: true,
    domain: process.env.DEVELOP_MODE === "prod" ? process.env.DOMAIN : "",
    sameSite: "None",
  });

  res.status(200).json({
    message: "user authenticated",
  });
});

exports.signup = asyncErrorHandler(async (req, res) => {
  const user = await authService.signup(req.body.username, req.body.password);

  const token = await createToken({ id: user.id });
  res.cookie(NAMES.JWT, token, { httpOnly: true, path: "/", secure: true });

  res.status(201).json({
    user: {
      username: req.body.username,
    },
    message: "user created",
  });
});

exports.requireAuth = asyncErrorHandler(async (req, res, next) => {
  const cookieJwt = req.cookies[NAMES.JWT] || undefined;

  if (!cookieJwt) {
    throw new HttpError(ERROR_CODES.E2003.MESSAGE, 401, ERROR_CODES.E2003.CODE);
  }

  const checkedIfBlacklisted = await findBlackListedToken(cookieJwt);
  if (checkedIfBlacklisted)
    return res.status(401).json({
      message: "Your token has expired, please login",
    });

  const decodedToken = await verifyToken(cookieJwt);
  req.decodedToken = decodedToken;
  req.cookieJwt = cookieJwt;

  next();
});

exports.logout = asyncErrorHandler(async (req, res) => {
  const cookieJwt = req.cookieJwt;
  if (!cookieJwt) {
    throw new HttpError("jwt not provided", 401);
  }
  const tokenHasBeenBlackListed = await findBlackListedToken(cookieJwt);
  if (tokenHasBeenBlackListed) {
    return res.status(204).json({});
  }

  await createNewBlackListedToken(cookieJwt);
  res.cookie(NAMES.JWT, "", { expiresIn: 0, httpOnly: true });

  res.status(200).json({
    status: "success",
    message: "you are logged out!",
  });
});
