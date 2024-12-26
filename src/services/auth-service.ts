import { JWT_SIGN } from "../configs/jwt";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import ErrorHandler from "../utils/customError";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

const registerService = async (full_name: string, password: string) => {
  if (!full_name || typeof full_name !== "string") {
    throw new ErrorHandler({
      success: false,
      status: 400,
      message: "full_name required and must be string",
    });
  }
  if (!password || typeof password !== "string") {
    throw new ErrorHandler({
      success: false,
      status: 400,
      message: "password required and must be string",
    });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User();
    user.full_name = full_name;
    user.password = hashedPassword;

    const userRepository = AppDataSource.getRepository(User);
    await userRepository.save(user);

    return {
      success: true,
      message: "User registered successfully",
      data: user,
    };
  } catch (error: any) {
    console.error(error);
    throw new ErrorHandler({
      success: false,
      status: error.status,
      message: error.message,
    });
  }
};

const loginService = async (full_name: string, password: string) => {
  if (!full_name || typeof full_name !== "string") {
    throw new ErrorHandler({
      success: false,
      status: 400,
      message: "full_name required and must be string",
    });
  }
  if (!password || typeof password !== "string") {
    throw new ErrorHandler({
      success: false,
      status: 400,
      message: "password required and must be string",
    });
  }

  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({
      full_name: full_name,
    });
    if (!user) {
      throw new ErrorHandler({
        success: false,
        message: "username or password invalid",
        status: 401,
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password || "");
    if (!isPasswordValid) {
      throw new ErrorHandler({
        success: false,
        message: "username or password invalid",
        status: 401,
      });
    }
    const token = jwt.sign(
      { id: user.id, full_name: user.full_name },
      JWT_SIGN,
      { expiresIn: "1d" }
    );

    return {
      success: true,
      message: "User logged in successfully",
      token: token,
    };
  } catch (error: any) {
    console.log(error);
    throw new ErrorHandler({
      success: false,
      status: error.status,
      message: error.message,
    });
  }
};

export { registerService, loginService };
