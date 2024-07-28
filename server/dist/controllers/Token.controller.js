"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwtencoder_1 = require("../utilities/jwtencoder");
class tokenController {
    createToken(req, res) {
        var _a;
        const { payload } = (0, jwtencoder_1.JWTdecoder)((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]);
        const body = Object.assign(Object.assign({}, req.body), { payload });
    }
    deleteToken(req, res) {
        var _a;
        const { payload } = (0, jwtencoder_1.JWTdecoder)((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]);
        const body = Object.assign(Object.assign({}, req.body), { payload });
    }
}
module.exports = new tokenController();
