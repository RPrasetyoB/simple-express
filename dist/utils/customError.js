"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorHandler extends Error {
    constructor({ success, status, message, }) {
        super(message);
        this.status = status;
        this.success = success;
    }
}
exports.default = ErrorHandler;
//# sourceMappingURL=customError.js.map