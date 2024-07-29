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
const Phone_service_1 = __importDefault(require("../services/Phone.service"));
const jwtencoder_1 = require("../utilities/jwtencoder");
const tokenHandler_1 = require("../utilities/tokenHandler");
const index_1 = __importDefault(require("../models/index"));
const Logs_model_1 = __importDefault(require("../models/Logs.model"));
const sequelize_1 = require("sequelize");
const Log = (0, Logs_model_1.default)(index_1.default.sequelize, sequelize_1.DataTypes);
class PhoneController {
    createPhone(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
                const payload = ((_b = (0, jwtencoder_1.JWTdecoder)(token)) === null || _b === void 0 ? void 0 : _b.payload) || ((_c = (0, tokenHandler_1.tokenDecoder)(token)) === null || _c === void 0 ? void 0 : _c.payload);
                const body = Object.assign(Object.assign({}, req.body), { payload });
                console.log(payload);
                const response = yield Phone_service_1.default.createPhone(body, req.files);
                yield Log.create({
                    logId: null,
                    action: `NEW - ${body.phoneName} was added.`,
                    userId: payload.userId,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
                return res.json(response);
            }
            catch (err) {
                return res.status(500).json(err);
            }
        });
    }
    getPhones(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                if (!req.query.page) {
                    return res.status(400).json({ message: "You have to specify the page you want to see.", error: true });
                }
                const page = parseInt(req.query.page);
                if (page < 1) {
                    return res.status(400).json({ message: "The page number can't be less than 1.", error: true });
                }
                const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
                const payload = ((_b = (0, jwtencoder_1.JWTdecoder)(token)) === null || _b === void 0 ? void 0 : _b.payload) || ((_c = (0, tokenHandler_1.tokenDecoder)(token)) === null || _c === void 0 ? void 0 : _c.payload);
                const response = yield Phone_service_1.default.getPhones(payload.userId, page);
                yield Log.create({
                    logId: null,
                    action: `GET - Phones listed by user ${payload.userId}.`,
                    userId: payload.userId,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
                return res.json(response);
            }
            catch (err) {
                return res.status(500).json(err);
            }
        });
    }
    getPhone(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                const { id } = req.params;
                if (!id) {
                    return res.status(400).json({ message: "The id param is missing.", error: true });
                }
                const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
                const payload = ((_b = (0, jwtencoder_1.JWTdecoder)(token)) === null || _b === void 0 ? void 0 : _b.payload) || ((_c = (0, tokenHandler_1.tokenDecoder)(token)) === null || _c === void 0 ? void 0 : _c.payload);
                const response = yield Phone_service_1.default.getPhone(id, payload.userId);
                return res.json(response);
            }
            catch (err) {
                return res.status(500).json(err);
            }
        });
    }
    deletePhone(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                const { id } = req.params;
                if (!id) {
                    return res.status(400).json({ message: "The id phone param is missing.", error: true });
                }
                const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
                const payload = ((_b = (0, jwtencoder_1.JWTdecoder)(token)) === null || _b === void 0 ? void 0 : _b.payload) || ((_c = (0, tokenHandler_1.tokenDecoder)(token)) === null || _c === void 0 ? void 0 : _c.payload);
                console.log(payload);
                const response = yield Phone_service_1.default.deletePhone(parseInt(id), payload.userId);
                return res.json(response);
            }
            catch (err) {
                return res.status(500).json(err);
            }
        });
    }
    loadPhones(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
                const payload = ((_b = (0, jwtencoder_1.JWTdecoder)(token)) === null || _b === void 0 ? void 0 : _b.payload) || ((_c = (0, tokenHandler_1.tokenDecoder)(token)) === null || _c === void 0 ? void 0 : _c.payload);
                const response = Phone_service_1.default.loadPhones(payload.userId);
                return res.json(response);
            }
            catch (err) {
                return res.status(500).json(err);
            }
        });
    }
    updatePhone(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Implementar lógica aquí
        });
    }
    deletePhones(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Implementar lógica aquí
        });
    }
}
exports.default = new PhoneController();
