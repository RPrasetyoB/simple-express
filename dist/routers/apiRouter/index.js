"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../../controllers/auth-controller");
const todo_controller_1 = require("../../controllers/todo-controller");
const authentication_1 = __importDefault(require("../../middlewares/authentication"));
const apiRouter = express_1.default.Router();
apiRouter.post("/auth/register", auth_controller_1.userRegister);
apiRouter.post("/auth/login", auth_controller_1.userLogin);
apiRouter.post("/todo", authentication_1.default, todo_controller_1.newTodo);
exports.default = apiRouter;
//# sourceMappingURL=index.js.map