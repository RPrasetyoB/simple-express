import express from "express";
import { userLogin, userRegister } from "../../controllers/auth-controller";
import { newTodo } from "../../controllers/todo-controller";
import authentication from "../../middlewares/authentication";

const apiRouter = express.Router();

apiRouter.post("/auth/register", userRegister);
apiRouter.post("/auth/login", userLogin);
apiRouter.post("/todo", authentication, newTodo);

export default apiRouter;
