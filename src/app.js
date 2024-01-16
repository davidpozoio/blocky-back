const express = require("express");
const dotenv = require("dotenv");
dotenv.config({
  path: ".env",
});
const {
  globalErrorController,
} = require("./controllers/global-error-controller");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const userRouter = require("./routes/user-router");
const noteRouter = require("./routes/notes-router");
const authRouter = require("./routes/auth-router");

const app = express();

app.use(
  cors({
    credentials: true,
    origin: [
      process.env.DEVELOP_MODE === "prod"
        ? process.env.HOST_FRONT_PROD
        : process.env.HOST_FRONT_DEV,
    ],
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/notes", noteRouter);

app.use("*", (req, res) => {
  res.status(400).json({ message: "route not found" });
});
app.use(globalErrorController);

module.exports = app;