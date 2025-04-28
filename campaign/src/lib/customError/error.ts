export class CustomError extends Error {
    statusCode: number;
  
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
  
      // Ensures the prototype chain is correctly set (important when targeting ES5 or lower)
      Object.setPrototypeOf(this, CustomError.prototype);
    }
  }