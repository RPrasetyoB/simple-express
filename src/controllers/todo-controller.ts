import { NextFunction, Request, Response } from "express";
import { createTodoService } from "../services/todo-service";
import { loggedUser } from "../utils/getUser";

const newTodo = async (req: Request, res: Response, next: NextFunction) => {
  const { todo_name } = req.body;
  try {
    const { user_id } = loggedUser(req.user);
    const result = await createTodoService(user_id, todo_name);
    if (result.success) {
      res.status(200).json({
        success: true,
        message: result.message,
        data: result.data,
      });
    }
  } catch (error) {
    next(error);
  }
};

export { newTodo };
