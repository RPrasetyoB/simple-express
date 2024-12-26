class ErrorHandler extends Error {
  public success: boolean;
  public status: number;

  constructor({
    success,
    status,
    message,
  }: {
    success: boolean;
    status: number;
    message: string;
  }) {
    super(message);
    this.status = status;
    this.success = success;
  }
}

export default ErrorHandler;
