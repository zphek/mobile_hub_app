import { Router } from "express";
import { authMiddleware } from "./middleware";
import TokenController from "../controllers/Token.controller";

const tokenRouter = Router();

tokenRouter
    .get("/get", authMiddleware, TokenController.getTokens)
    .post("/create", authMiddleware, TokenController.createToken)
    .delete("/delete/:id", authMiddleware, TokenController.deleteToken)

export default tokenRouter;