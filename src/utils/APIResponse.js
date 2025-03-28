class ApiResponse {
  constructor(statusCode, message, body, success = true) {
    this.statusCode = statusCode;
    this.message = message;
    this.body = body;
  }
}
export{ApiResponse}
