const express = require("express");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../swagger_output.json");

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
app.set("trust proxy", 1);

app.use(
  cors({
    credentials: true,
    origin: [
      process.env.DEVELOP_MODE === "prod"
        ? process.env.HOST_FRONT_PROD
        : process.env.HOST_FRONT_DEV,
    ],
    methods: ["POST", "GET", "PATCH", "PUT"],
  })
);

app.use(
  process.env.DEVELOP_MODE === "prod"
    ? (req, res, next) => {
        next();
      }
    : morgan("dev")
);
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/notes", noteRouter);
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("*", (req, res) => {
  res.status(400).json({ message: "route not found" });
});
app.use(globalErrorController);

module.exports = app;
