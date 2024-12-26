import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/customError";

const errorCatch = (
  error: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error.status || 500;
  const success = error.success || false;
  const message = error.message || "an error occured";

  res.status(status).json({ success, message });
};

export default errorCatch;
