import { Request, response, Response } from "express";
import PhoneService from "../services/Phone.service";
import { JWTdecoder } from "../utilities/jwtencoder";

class phoneController{
    createPhone(req: Request, res: Response){
        const { payload }:any = JWTdecoder(req.headers.authorization?.split(' ')[1]);
        const body = {...req.body, payload}
        console.log(body)
        
        PhoneService.createPhone(body, req.files)
        .then((response)=>{
            return res.json(response)
        })
        .catch((err)=>{
            return res.json(err)
        })
    }

    loadPhones(req: Request, res: Response){

    }

    getPhones(req: Request, res: Response){
        if(!req.query.page){
            return res.json({ message: "You have to especify the page you wanna see.", error: true });
        }

        if(parseInt(req.query.page) < 1){
            return res.json({ message: "The page number can't be less than 1.", error: true })
        }

        const { payload }:any = JWTdecoder(req.headers.authorization?.split(' ')[1]);
        const body = {...req.body, payload}

        PhoneService.getPhones(body.payload.userId, parseInt(req.query?.page))
        .then((response)=>{
            return res.json(response);
        })
        .catch((err)=>{
            return res.json(err)
        })
    }

    getPhone(req: Request, res: Response){

    }

    updatePhone(req: Request, res: Response){

    }
    
    deletePhones(req: Request, res: Response){

    }

    deletePhone(req: Request, res: Response){
        if(!req.params.id){
            return res.json({ message: "Miss the id phone param.", error: true })
        }

        const { payload }:any = JWTdecoder(req.headers.authorization?.split(' ')[1]);
        const body = {...req.body, payload}

        PhoneService.deletePhone(parseInt(req.params.id), payload.userId)
        .then((response)=>{
            return res.json(response)
        })
        .catch((err)=>{
            return res.json(err)
        })
    }
}

export default new phoneController();