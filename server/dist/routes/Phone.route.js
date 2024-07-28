"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const middleware_1 = require("./middleware");
const Phone_controller_1 = __importDefault(require("../controllers/Phone.controller"));
const router = (0, express_1.Router)();
const storage = multer_1.default.diskStorage({
    destination: "./uploads/phonesPhotos",
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path_1.default.extname(file.originalname)); // Nombre del archivo con extensión
    }
});
const upload = (0, multer_1.default)({ storage: storage });
router
    .post("/create", middleware_1.authMiddleware, upload.array("files", 5), Phone_controller_1.default.createPhone)
    .get("/get", middleware_1.authMiddleware, Phone_controller_1.default.getPhones)
    .get("/get/:id", middleware_1.authMiddleware, Phone_controller_1.default.getPhone)
    .delete("/delete/:id", middleware_1.authMiddleware, Phone_controller_1.default.deletePhone)
    .post("/get/load", middleware_1.authMiddleware, Phone_controller_1.default.loadPhones)
    .delete("/delete/all", middleware_1.authMiddleware, Phone_controller_1.default.deletePhones)
    .put("/update", middleware_1.authMiddleware, Phone_controller_1.default.updatePhone);
exports.default = router;
