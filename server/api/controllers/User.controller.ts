import { Request, response, Response } from "express";
import UserService from "../services/User.service";

class userController{
    userLogin(req: Request, res: Response){
        UserService.userLogin(req.body)
        .then((response)=>{
            return res.json(response)
        })
        .catch((response)=>{
            return res.json(response)
        })
    }

    userRegister(req: Request, res: Response){
        UserService.userRegister(req.body, req.file)
        .then((response)=>{
            return res.json(response)
        })
        .catch((error)=>{
            return res.json(error)
        })
    }
}

export default new userController();