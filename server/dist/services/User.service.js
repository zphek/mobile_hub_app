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
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../models/index"));
const User_model_1 = __importDefault(require("../models/User.model"));
const Logs_model_1 = __importDefault(require("../models/Logs.model"));
const randomstring_1 = __importDefault(require("randomstring"));
const encrypt_1 = require("../utilities/encrypt");
const jwtencoder_1 = require("../utilities/jwtencoder");
const User = (0, User_model_1.default)(index_1.default.sequelize, sequelize_1.DataTypes);
const Log = (0, Logs_model_1.default)(index_1.default.sequelize, sequelize_1.DataTypes);
class userService {
    userLogin(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (!body.email || !body.password) {
                    reject({ message: "Email and password are required." });
                    return;
                }
                User.findOne({
                    where: {
                        email: body.email
                    }
                })
                    .then((response) => __awaiter(this, void 0, void 0, function* () {
                    if (response) {
                        if ((0, encrypt_1.comparePassword)(body.password, response.dataValues.password, response.dataValues.passwordHash)) {
                            const token = yield (0, jwtencoder_1.JWTencoder)(response.dataValues);
                            resolve({ message: "User logged in.", logged: true, token });
                            return;
                        }
                        reject({ message: "Username or password are incorrect.", logged: false });
                        return;
                    }
                    reject({ message: "Username doesn't exist.", logged: false });
                    return;
                }))
                    .catch((response) => {
                    reject(response);
                });
            });
        });
    }
    userRegister(body) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!body.email || !body.password) {
                return Promise.reject({ message: "Email, password are required." });
            }
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const user = yield User.findOne({
                        where: {
                            email: body.email
                        }
                    });
                    if (user) {
                        reject({ message: "Use another email to register, this one is already registered.", error: true });
                        return;
                    }
                    const hash = randomstring_1.default.generate(15);
                    User.create({
                        userId: null,
                        email: body.email,
                        password: (0, encrypt_1.encryptPassword)(body.password, hash),
                        passwordHash: hash,
                        imageUrl: "",
                        createdAt: new Date(),
                        updatedAt: new Date()
                    })
                        .then((response) => {
                        resolve({ message: `The user with email ${body.email} has successfully created an account.` });
                    })
                        .catch((error) => {
                        console.log(error);
                        reject(error);
                    });
                }
                catch (error) {
                    console.log(error);
                    reject(error);
                }
            }));
        });
    }
    getLogs(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                Log.findAll({
                    where: {
                        userId
                    }
                })
                    .then((response) => {
                    if (response) {
                        resolve({ data: response, error: false });
                    }
                })
                    .catch((err) => {
                    reject({ err, error: true });
                });
            });
        });
    }
}
exports.default = new userService();
