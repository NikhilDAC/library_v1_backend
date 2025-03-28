class ApiError extends Error {
  constructor(statusCode, message, success = false, errors = [], stack) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
    this.stack = stack;

    if (!stack) {
      this.stack = Error.captureStackTrace(constructor);
    }
  }
}

export{ApiError}