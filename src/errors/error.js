const {StatusCodes} = require('http-status-codes')

class customAPIError extends Error{
    constructor(message){
       super(message)
       this.status = false
    }
}
class BadRequestError extends customAPIError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}
class InternalServerError extends customAPIError {
  constructor(message) {
      super(message)
      this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR
  }
}

class NotFoundError extends customAPIError {
    constructor(message) {
      super(message);
      this.statusCode = StatusCodes.NOT_FOUND;
    }
    
  }
  
  class UnauthenticatedError  extends customAPIError {
    constructor(message) {
      super(message);
      this.statusCode = StatusCodes.UNAUTHORIZED;
    }
    
  }
  
class UnauthorizedError extends customAPIError {
    constructor(message) {
      super(message);
      this.statusCode = StatusCodes.FORBIDDEN;
    }
  }
  
module.exports= {
    UnauthenticatedError,
    InternalServerError,
    BadRequestError,
    UnauthorizedError,
    NotFoundError
}