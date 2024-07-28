"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptPassword = encryptPassword;
exports.comparePassword = comparePassword;
const crypto_js_1 = require("crypto-js");
const enc_utf8_1 = __importDefault(require("crypto-js/enc-utf8"));
const SECRET = "123456789";
function encryptPassword(password, passwordHash) {
    return crypto_js_1.AES.encrypt(password, SECRET + passwordHash).toString();
}
function comparePassword(plainPassword, hashedPassword, hash) {
    // console.log(AES.decrypt(hashedPassword, SECRET + hash).toString(Utf8), plainPassword, hashedPassword)
    return crypto_js_1.AES.decrypt(hashedPassword, SECRET + hash).toString(enc_utf8_1.default) == plainPassword;
}
