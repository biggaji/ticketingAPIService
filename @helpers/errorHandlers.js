class NotFoundException extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}

class ValidationException extends NotFoundException {};
class AuthForbiddenException extends NotFoundException {};
class InvalidOrExpiredAuthToken extends NotFoundException {};

module.exports = {
  ValidationException,
  NotFoundException,
  AuthForbiddenException,
  InvalidOrExpiredAuthToken
}