import { DataTypes } from "sequelize";
import models from "../models/index";
import model from "../models/Tokens.model";
import { tokenEncoder } from "../utilities/tokenHandler";
import { v4 } from "uuid";

const Token = model(models.sequelize, DataTypes);

interface createParams {
    payload: any;
    read: boolean;
    insert: boolean;
    delete: boolean;
    update: boolean;
    reference: string;
}

class tokenService{
    getTokens(userId: number){
        return new Promise((resolve, reject)=>{
            Token.findAll({
                where:{
                    userId
                }
            })
            .then((data)=>{
                if(data){
                    resolve({ data, error: false })
                    return;
                }
    
                reject({ message: "There's no data to show.", error: false })
            })
            .catch((err)=>{
                reject({ ...err, error: true })
            })
        })
    }
    
    createToken(body:createParams, ){
        return new Promise((resolve, reject)=>{
            const ApiToken = tokenEncoder(body);
            Token.create({
                tokenId: null,
                tokenReference: body.reference,
                userId: body.payload.userId,
                active: true,
                createdAt: new Date(),
                updatedtAt: new Date()
            })
            .then((response)=>{
                resolve({ token: ApiToken, reference: body.reference, error: false })
            })
            .catch((err)=>{
                reject({ ...err, error: true })
            })
        })
    }

    deleteToken(tokenId:number, userId:number){
        return new Promise((resolve, reject)=>{
            Token.destroy({
                where:{
                    tokenId,
                    userId
                }
            })
            .then((response)=>{
                resolve({ message: `The token was successfully deleted.`, error: false })
            })
            .catch((err)=>{
                reject({ ...err, error: true })
            })
        })
    }
}

export default new tokenService();