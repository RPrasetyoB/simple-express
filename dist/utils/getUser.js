"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggedUser = void 0;
const loggedUser = (decodedToken) => {
    return {
        user_id: decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.id,
        full_name: decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.full_name,
    };
};
exports.loggedUser = loggedUser;
//# sourceMappingURL=getUser.js.map