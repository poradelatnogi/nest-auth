"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtractFromCookies = void 0;
class ExtractFromCookies {
    static extract(req) {
        if (req.cookies && 'access_token' in req.cookies) {
            return req.cookies.access_token;
        }
        return null;
    }
}
exports.ExtractFromCookies = ExtractFromCookies;
//# sourceMappingURL=extract-from.cookies.js.map