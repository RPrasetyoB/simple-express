import { AppDataSource } from "../data-source";
import { Todo } from "../entity/Todo";
import ErrorHandler from "../utils/customError";

const createTodoService = async (user_id: number, todo_name: string) => {
  if (!todo_name || typeof todo_name !== "string") {
    throw new ErrorHandler({
      success: false,
      status: 400,
      message: "todo name required and must be string",
    });
  }
  try {
    const todo = new Todo();
    todo.user_id = user_id;
    todo.todo_name = todo_name;

    const userRepository = AppDataSource.getRepository(Todo);
    await userRepository.save(todo);

    return {
      success: true,
      message: "todo created successfully",
      data: todo,
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

export { createTodoService };
