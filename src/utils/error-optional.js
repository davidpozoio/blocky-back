class HttpError extends Error {
  constructor(message, code) {
    super();
    this.isOptional = true;
    this.message = message;
    this.code = code;
  }
}

module.exports = HttpError;
