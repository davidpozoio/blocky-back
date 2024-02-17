class HttpError extends Error {
  constructor(message, code, errorCode = undefined) {
    super();
    this.isOptional = true;
    this.message = message;
    this.code = code;
    this.errorCode = errorCode;
  }
}

module.exports = HttpError;
