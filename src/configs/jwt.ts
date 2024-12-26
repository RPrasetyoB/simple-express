import * as dotenv from "dotenv";
dotenv.config();

const { JWT_SECRET } = process.env;

export const JWT_SIGN = JWT_SECRET;
