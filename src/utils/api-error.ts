class ApiError extends Error {
  statusCode: number;
  data: any;
  success: boolean;
  errors: any[];
  constructor(
    statusCode: number,
    message = "Something went wrong",
    errors:any[] = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    this.errors = errors;
    this.message = message;
    this.data = null;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
