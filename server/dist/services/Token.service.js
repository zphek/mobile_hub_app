"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../models/index"));
const Tokens_model_1 = __importDefault(require("../models/Tokens.model"));
const tokenHandler_1 = require("../utilities/tokenHandler");
const Token = (0, Tokens_model_1.default)(index_1.default.sequelize, sequelize_1.DataTypes);
class tokenService {
    getTokens(userId) {
        return new Promise((resolve, reject) => {
            Token.findAll({
                where: {
                    userId
                }
            })
                .then((data) => {
                if (data) {
                    resolve({ data, error: false });
                    return;
                }
                reject({ message: "There's no data to show.", error: false });
            })
                .catch((err) => {
                reject(Object.assign(Object.assign({}, err), { error: true }));
            });
        });
    }
    createToken(body) {
        return new Promise((resolve, reject) => {
            const ApiToken = (0, tokenHandler_1.tokenEncoder)(body);
            Token.create({
                tokenId: null,
                tokenReference: body.reference,
                userId: body.payload.userId,
                active: true,
                createdAt: new Date(),
                updatedtAt: new Date()
            })
                .then((response) => {
                resolve({ token: ApiToken, reference: body.reference, error: false });
            })
                .catch((err) => {
                reject(Object.assign(Object.assign({}, err), { error: true }));
            });
        });
    }
    deleteToken(tokenId, userId) {
        return new Promise((resolve, reject) => {
            Token.destroy({
                where: {
                    tokenId,
                    userId
                }
            })
                .then((response) => {
                resolve({ message: `The token was successfully deleted.`, error: false });
            })
                .catch((err) => {
                reject(Object.assign(Object.assign({}, err), { error: true }));
            });
        });
    }
}
exports.default = new tokenService();
