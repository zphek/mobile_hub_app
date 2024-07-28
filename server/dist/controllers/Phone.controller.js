"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Phone_service_1 = __importDefault(require("../services/Phone.service"));
const jwtencoder_1 = require("../utilities/jwtencoder");
class phoneController {
    createPhone(req, res) {
        var _a;
        const { payload } = (0, jwtencoder_1.JWTdecoder)((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]);
        const body = Object.assign(Object.assign({}, req.body), { payload });
        console.log(body);
        Phone_service_1.default.createPhone(body, req.files)
            .then((response) => {
            return res.json(response);
        })
            .catch((err) => {
            return res.json(err);
        });
    }
    loadPhones(req, res) {
    }
    getPhones(req, res) {
        var _a, _b;
        if (!req.query.page) {
            return res.json({ message: "You have to especify the page you wanna see.", error: true });
        }
        if (parseInt(req.query.page) < 1) {
            return res.json({ message: "The page number can't be less than 1.", error: true });
        }
        const { payload } = (0, jwtencoder_1.JWTdecoder)((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]);
        const body = Object.assign(Object.assign({}, req.body), { payload });
        Phone_service_1.default.getPhones(body.payload.userId, parseInt((_b = req.query) === null || _b === void 0 ? void 0 : _b.page))
            .then((response) => {
            return res.json(response);
        })
            .catch((err) => {
            return res.json(err);
        });
    }
    getPhone(req, res) {
    }
    updatePhone(req, res) {
    }
    deletePhones(req, res) {
    }
    deletePhone(req, res) {
        var _a;
        if (!req.params.id) {
            return res.json({ message: "Miss the id phone param.", error: true });
        }
        const { payload } = (0, jwtencoder_1.JWTdecoder)((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]);
        const body = Object.assign(Object.assign({}, req.body), { payload });
        Phone_service_1.default.deletePhone(parseInt(req.params.id), payload.userId)
            .then((response) => {
            return res.json(response);
        })
            .catch((err) => {
            return res.json(err);
        });
    }
}
exports.default = new phoneController();
