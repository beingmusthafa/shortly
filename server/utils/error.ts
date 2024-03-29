export class CustomError extends Error {
  statusCode: number;
  message: string;
  constructor(message: string, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const customError = (message: string, statusCode: number) => {
  return new CustomError(message, statusCode);
};

export default customError;
