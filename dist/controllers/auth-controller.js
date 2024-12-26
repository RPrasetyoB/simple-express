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
exports.userLogin = exports.userRegister = void 0;
const auth_service_1 = require("../services/auth-service");
const userRegister = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { full_name, password } = req.body;
    try {
        const result = yield (0, auth_service_1.registerService)(full_name, password);
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
    }
    catch (error) {
        next(error);
    }
});
exports.userRegister = userRegister;
const userLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { full_name, password } = req.body;
    try {
        const result = yield (0, auth_service_1.loginService)(full_name, password);
        if (result.success) {
            res.status(200).json({
                success: true,
                message: result.message,
                token: result.token,
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.userLogin = userLogin;
//# sourceMappingURL=auth-controller.js.map