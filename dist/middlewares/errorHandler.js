"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorCatch = (error, req, res, next) => {
    const status = error.status || 500;
    const success = error.success || false;
    const message = error.message || "an error occured";
    res.status(status).json({ success, message });
};
exports.default = errorCatch;
//# sourceMappingURL=errorHandler.js.map