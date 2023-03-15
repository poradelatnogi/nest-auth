"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractFromCookies = void 0;
const extractFromCookies = (req) => {
    if (req.cookies && 'access_token' in req.cookies) {
        return req.cookies.access_token;
    }
    return null;
};
exports.extractFromCookies = extractFromCookies;
//# sourceMappingURL=extract-from.cookies.js.map