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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTencoder = JWTencoder;
exports.JWTdecoder = JWTdecoder;
exports.JWTchecker = JWTchecker;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = "kmGoDr2HWP";
function JWTencoder(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const JWT = jsonwebtoken_1.default.sign(payload, SECRET, { expiresIn: "1h" });
        console.log(JWT);
        return JWT;
    });
}
function JWTdecoder(token) {
    try {
        const decoded = jsonwebtoken_1.default.decode(token, { complete: true });
        return decoded;
    }
    catch (error) {
        console.error('JWT decoding failed:', error);
        return null;
    }
}
function JWTchecker(token) {
    try {
        jsonwebtoken_1.default.verify(token, SECRET);
        return true;
    }
    catch (error) {
        console.error('JWT verification failed:', error);
        return false;
    }
}
