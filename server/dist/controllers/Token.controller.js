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
const jwtencoder_1 = require("../utilities/jwtencoder");
const Token_service_1 = __importDefault(require("../services/Token.service"));
const uuid_1 = require("uuid");
class TokenController {
    createToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                if (req.body.read == null || req.body.insert == null || req.body.update == null || req.body.delete == null) {
                    return res.status(400).json({ message: 'The fields read, insert, update, and delete are required.', error: true });
                }
                const { payload } = (0, jwtencoder_1.JWTdecoder)((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]);
                const body = Object.assign(Object.assign({}, req.body), { payload, reference: (0, uuid_1.v4)() });
                const response = yield Token_service_1.default.createToken(body);
                return res.json(response);
            }
            catch (err) {
                return res.status(500).json(err);
            }
        });
    }
    getTokens(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { payload } = (0, jwtencoder_1.JWTdecoder)((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]);
                const response = yield Token_service_1.default.getTokens(payload.userId);
                return res.json(response);
            }
            catch (err) {
                return res.status(500).json(err);
            }
        });
    }
    deleteToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { id } = req.params;
                if (!id) {
                    return res.status(400).json({ message: "The id parameter is missing.", error: true });
                }
                const { payload } = (0, jwtencoder_1.JWTdecoder)((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]);
                const response = yield Token_service_1.default.deleteToken(id, payload.userId);
                return res.json(response);
            }
            catch (err) {
                return res.status(500).json(err);
            }
        });
    }
}
exports.default = new TokenController();
