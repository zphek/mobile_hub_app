import { Router, Request, Response } from "express";
import { authMiddleware } from "./middleware";

const tokenRouter = Router();

const SECRET:string = "bernardo1234"

tokenRouter
    .post("/get", authMiddleware, (req: Request, res: Response)=>{
        
    })
    .delete("/delete/:id", authMiddleware, (req: Request, res: Response)=>{

    })

export default tokenRouter;