"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_controller_1 = __importDefault(require("../controllers/User.controller"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const middleware_1 = require("./middleware");
const userRouter = (0, express_1.Router)();
const storage = multer_1.default.diskStorage({
    destination: "./uploads/userPhotos",
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path_1.default.extname(file.originalname)); // Nombre del archivo con extensión
    }
});
const upload = (0, multer_1.default)({ storage: storage });
userRouter
    .get("/logs", middleware_1.authMiddleware, User_controller_1.default.getLogs)
    .post("/login", User_controller_1.default.userLogin)
    .post("/register", User_controller_1.default.userRegister);
exports.default = userRouter;
