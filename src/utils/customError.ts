// Custom Error Hanadler Class Inheriting Built in Error Class
class CustomError extends Error {
  statusCode: number;
  isOperational: boolean;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

export default CustomError;
