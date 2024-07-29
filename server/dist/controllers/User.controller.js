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
const User_service_1 = __importDefault(require("../services/User.service"));
const jwtencoder_1 = require("../utilities/jwtencoder");
const tokenHandler_1 = require("../utilities/tokenHandler");
class UserController {
    userLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield User_service_1.default.userLogin(req.body);
                return res.json(response);
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
    userRegister(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield User_service_1.default.userRegister(req.body);
                return res.json(response);
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
    getLogs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const authHeader = req.headers.authorization;
                if (!authHeader || !authHeader.startsWith('Bearer ')) {
                    return res.status(401).json({ message: 'Authorization header is missing or invalid.', error: true });
                }
                const token = authHeader.split(' ')[1];
                let payload;
                try {
                    payload = ((_a = (0, jwtencoder_1.JWTdecoder)(token)) === null || _a === void 0 ? void 0 : _a.payload) || (0, tokenHandler_1.tokenDecoder)(token).payload;
                }
                catch (error) {
                    return res.status(401).json({ message: 'Invalid token.', error: true });
                }
                const response = yield User_service_1.default.getLogs(payload.userId);
                return res.json(response);
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
}
exports.default = new UserController();
