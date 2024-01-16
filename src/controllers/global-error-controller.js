exports.globalErrorController = (error, req, res, next) => {
  if (Array.isArray(error)) {
    return res.status(400).json({ errors: error });
  }
  if (!error.isOptional) {
    return process.env.DEVELOP_MODE == "prod"
      ? res.status(500).json({ message: "there was an error, try later" })
      : res.status(500).json({ message: error.message, error });
  }

  res.status(error.code).json({
    message: error.message,
  });
};
