"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../models/index"));
const Tokens_model_1 = __importDefault(require("../models/Tokens.model"));
const Token = (0, Tokens_model_1.default)(index_1.default.sequelize, sequelize_1.DataTypes);
class tokenService {
    createToken(userId) {
    }
    deleteToken() {
    }
}
exports.default = new tokenService();
