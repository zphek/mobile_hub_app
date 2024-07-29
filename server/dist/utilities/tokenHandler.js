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
exports.tokenEncoder = tokenEncoder;
exports.tokenDecoder = tokenDecoder;
exports.isTokenValid = isTokenValid;
const crypto_js_1 = require("crypto-js");
const enc_utf8_1 = __importDefault(require("crypto-js/enc-utf8"));
const index_1 = __importDefault(require("../models/index"));
const Tokens_model_1 = __importDefault(require("../models/Tokens.model"));
const sequelize_1 = require("sequelize");
const TOKEN = (0, Tokens_model_1.default)(index_1.default.sequelize, sequelize_1.DataTypes);
const SECRET = "s_l/e?rs184pd]";
function tokenEncoder(payload) {
    return crypto_js_1.AES.encrypt(JSON.stringify(payload), SECRET).toString();
}
function tokenDecoder(token) {
    return JSON.parse(crypto_js_1.AES.decrypt(token, SECRET).toString(enc_utf8_1.default));
}
function isTokenValid(token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // console.log(token)
            const PAYLOAD = tokenDecoder(token);
            console.log(PAYLOAD);
            if (!PAYLOAD.payload.userId || !PAYLOAD.reference || PAYLOAD.read == null || PAYLOAD.insert == null || PAYLOAD.delete == null || PAYLOAD.update == null) {
                return false;
            }
            const response = yield TOKEN.findOne({
                where: {
                    tokenReference: PAYLOAD.reference,
                    active: true
                }
            });
            // console.log(response)
            if (!response) {
                return false;
            }
            return true;
        }
        catch (error) {
            return false;
        }
    });
}
