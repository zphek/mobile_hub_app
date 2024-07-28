import { NextFunction, Request, Response } from "express";
import { JWTchecker } from "../utilities/jwtencoder";

export function authMiddleware(req: Request, res: Response, next: NextFunction){
    const AUTH_HEADER:any = req.headers.authorization;

    if(!AUTH_HEADER){
        return res.json({ message: "Authorization header is missing.", error: true })  
    }

    if(!AUTH_HEADER.startsWith('Bearer ')){
        return res.json({ message: 'Authorization header must start with "Bearer "', error: true  })
    }
    
    const token = AUTH_HEADER.split(' ')[1]

    if(JWTchecker(token)){
        next();

        return;
    }   

    return res.json({ message: "You don't have the required access.", error: true })
}