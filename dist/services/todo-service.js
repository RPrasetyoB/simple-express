"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTodoService = void 0;
const data_source_1 = require("../data-source");
const Todo_1 = require("../entity/Todo");
const customError_1 = __importDefault(require("../utils/customError"));
const createTodoService = (user_id, todo_name) => __awaiter(void 0, void 0, void 0, function* () {
    if (!todo_name || typeof todo_name !== "string") {
        throw new customError_1.default({
            success: false,
            status: 400,
            message: "todo name required and must be string",
        });
    }
    try {
        const todo = new Todo_1.Todo();
        todo.user_id = user_id;
        todo.todo_name = todo_name;
        const userRepository = data_source_1.AppDataSource.getRepository(Todo_1.Todo);
        yield userRepository.save(todo);
        return {
            success: true,
            message: "todo created successfully",
            data: todo,
        };
    }
    catch (error) {
        console.error(error);
        throw new customError_1.default({
            success: false,
            status: error.status,
            message: error.message,
        });
    }
});
exports.createTodoService = createTodoService;
//# sourceMappingURL=todo-service.js.map