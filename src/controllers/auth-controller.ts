import { NextFunction, Request, Response } from "express";
import { loginService, registerService } from "../services/auth-service";

const userRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { full_name, password } = req.body;
  try {
    const result = await registerService(full_name, password);
    if (result.success) {
      res.status(201).json({
        success: true,
        message: result.message,
        data: {
          id: result.data.id,
          full_name: result.data.full_name,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

const userLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { full_name, password } = req.body;
  try {
    const result = await loginService(full_name, password);
    if (result.success) {
      res.status(200).json({
        success: true,
        message: result.message,
        token: result.token,
      });
    }
  } catch (error) {
    next(error);
  }
};

export { userRegister, userLogin };
