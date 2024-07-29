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
exports.authMiddleware = authMiddleware;
const jwtencoder_1 = require("../utilities/jwtencoder");
const tokenHandler_1 = require("../utilities/tokenHandler");
function authMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const AUTH_HEADER = req.headers.authorization;
        if (!AUTH_HEADER) {
            return res.json({ message: "Authorization header is missing.", error: true });
        }
        if (!AUTH_HEADER.startsWith('Bearer ')) {
            return res.json({ message: 'Authorization header must start with "Bearer "', error: true });
        }
        const token = AUTH_HEADER.split(' ')[1];
        // console.log(req.baseUrl)
        if ((yield (0, tokenHandler_1.isTokenValid)(token)) && req.baseUrl == "/api/phone") {
            // console.log("VALID")
            next();
            return;
        }
        if ((0, jwtencoder_1.JWTchecker)(token)) {
            next();
            return;
        }
        return res.json({ message: "You don't have the required access.", error: true });
    });
}
