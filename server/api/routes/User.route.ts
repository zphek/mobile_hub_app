import {Request, Response, Router } from "express";
import UserController from "../controllers/User.controller";
import multer from "multer";
import path from "path";
import { authMiddleware } from "./middleware";
const userRouter = Router();

const storage = multer.diskStorage({
  destination: "./uploads/userPhotos",
  filename: function (req: any, file:any, cb:any) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Nombre del archivo con extensión
  }
});

const upload = multer({ storage: storage });

userRouter
    .get("/logs", authMiddleware, UserController.getLogs)
    .post("/login", UserController.userLogin )
    .post("/register", UserController.userRegister )

export default userRouter;