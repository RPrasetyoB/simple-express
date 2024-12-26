import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { JWT_SIGN } from "../configs/jwt";

declare global {
  namespace Express {
    interface Request {
      user?: UserType;
    }
  }
}

const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).send({ message: "Unauthorized, please login" });
      return;
    }
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, JWT_SIGN) as UserType;
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).send({ message: "Unauthorized, please login" });
    }
  };
};

const authentication = auth();

export default authentication;
