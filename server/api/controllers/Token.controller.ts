import { Request, Response } from "express";
import { JWTdecoder } from "../utilities/jwtencoder";

class tokenController{
    createToken(req: Request, res: Response){
        const { payload }:any = JWTdecoder(req.headers.authorization?.split(' ')[1]);
        const body = {...req.body, payload}
    }

    deleteToken(req: Request, res: Response){
        const { payload }:any = JWTdecoder(req.headers.authorization?.split(' ')[1]);
        const body = {...req.body, payload}
    }
}

module.exports = new tokenController();