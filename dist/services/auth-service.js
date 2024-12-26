"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.loginService = exports.registerService = void 0;
const jwt_1 = require("../configs/jwt");
const data_source_1 = require("../data-source");
const User_1 = require("../entity/User");
const customError_1 = __importDefault(require("../utils/customError"));
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const registerService = (full_name, password) => __awaiter(void 0, void 0, void 0, function* () {
    if (!full_name || typeof full_name !== "string") {
        throw new customError_1.default({
            success: false,
            status: 400,
            message: "full_name required and must be string",
        });
    }
    if (!password || typeof password !== "string") {
        throw new customError_1.default({
            success: false,
            status: 400,
            message: "password required and must be string",
        });
    }
    try {
        const hashedPassword = yield bcrypt.hash(password, 10);
        const user = new User_1.User();
        user.full_name = full_name;
        user.password = hashedPassword;
        const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
        yield userRepository.save(user);
        return {
            success: true,
            message: "User registered successfully",
            data: user,
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
exports.registerService = registerService;
const loginService = (full_name, password) => __awaiter(void 0, void 0, void 0, function* () {
    if (!full_name || typeof full_name !== "string") {
        throw new customError_1.default({
            success: false,
            status: 400,
            message: "full_name required and must be string",
        });
    }
    if (!password || typeof password !== "string") {
        throw new customError_1.default({
            success: false,
            status: 400,
            message: "password required and must be string",
        });
    }
    try {
        const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
        const user = yield userRepository.findOneBy({
            full_name: full_name,
        });
        if (!user) {
            throw new customError_1.default({
                success: false,
                message: "username or password invalid",
                status: 401,
            });
        }
        const isPasswordValid = yield bcrypt.compare(password, user.password || "");
        if (!isPasswordValid) {
            throw new customError_1.default({
                success: false,
                message: "username or password invalid",
                status: 401,
            });
        }
        const token = jwt.sign({ id: user.id, full_name: user.full_name }, jwt_1.JWT_SIGN, { expiresIn: "1d" });
        return {
            success: true,
            message: "User logged in successfully",
            token: token,
        };
    }
    catch (error) {
        console.log(error);
        throw new customError_1.default({
            success: false,
            status: error.status,
            message: error.message,
        });
    }
});
exports.loginService = loginService;
//# sourceMappingURL=auth-service.js.map