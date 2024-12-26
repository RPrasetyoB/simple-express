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
Object.defineProperty(exports, "__esModule", { value: true });
exports.newTodo = void 0;
const todo_service_1 = require("../services/todo-service");
const getUser_1 = require("../utils/getUser");
const newTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { todo_name } = req.body;
    try {
        const { user_id } = (0, getUser_1.loggedUser)(req.user);
        const result = yield (0, todo_service_1.createTodoService)(user_id, todo_name);
        if (result.success) {
            res.status(200).json({
                success: true,
                message: result.message,
                data: result.data,
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.newTodo = newTodo;
//# sourceMappingURL=todo-controller.js.map