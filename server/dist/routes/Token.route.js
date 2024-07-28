"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("./middleware");
const tokenRouter = (0, express_1.Router)();
const SECRET = "bernardo1234";
tokenRouter
    .post("/get", middleware_1.authMiddleware, (req, res) => {
})
    .delete("/delete/:id", middleware_1.authMiddleware, (req, res) => {
});
exports.default = tokenRouter;
