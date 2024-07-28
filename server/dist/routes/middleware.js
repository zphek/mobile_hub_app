"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jwtencoder_1 = require("../utilities/jwtencoder");
function authMiddleware(req, res, next) {
    const AUTH_HEADER = req.headers.authorization;
    if (!AUTH_HEADER) {
        return res.json({ message: "Authorization header is missing.", error: true });
    }
    if (!AUTH_HEADER.startsWith('Bearer ')) {
        return res.json({ message: 'Authorization header must start with "Bearer "', error: true });
    }
    const token = AUTH_HEADER.split(' ')[1];
    if ((0, jwtencoder_1.JWTchecker)(token)) {
        next();
        return;
    }
    return res.json({ message: "You don't have the required access.", error: true });
}
