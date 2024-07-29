"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("./middleware");
const Token_controller_1 = __importDefault(require("../controllers/Token.controller"));
const tokenRouter = (0, express_1.Router)();
tokenRouter
    .get("/get", middleware_1.authMiddleware, Token_controller_1.default.getTokens)
    .post("/create", middleware_1.authMiddleware, Token_controller_1.default.createToken)
    .delete("/delete/:id", middleware_1.authMiddleware, Token_controller_1.default.deleteToken);
exports.default = tokenRouter;
