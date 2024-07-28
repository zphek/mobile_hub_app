"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_service_1 = __importDefault(require("../services/User.service"));
class userController {
    userLogin(req, res) {
        User_service_1.default.userLogin(req.body)
            .then((response) => {
            return res.json(response);
        })
            .catch((response) => {
            return res.json(response);
        });
    }
    userRegister(req, res) {
        User_service_1.default.userRegister(req.body, req.file)
            .then((response) => {
            return res.json(response);
        })
            .catch((error) => {
            return res.json(error);
        });
    }
}
exports.default = new userController();
