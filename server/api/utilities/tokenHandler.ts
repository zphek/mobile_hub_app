import {AES, mode} from "crypto-js"
import Utf8 from 'crypto-js/enc-utf8';

import models from "../models/index"
import model from "../models/Tokens.model"
import { DataTypes } from "sequelize";
const TOKEN = model(models.sequelize, DataTypes);

const SECRET = "s_l/e?rs184pd]"

export function tokenEncoder(payload:any){
    return AES.encrypt(JSON.stringify(payload), SECRET).toString();
}

export function tokenDecoder(token:string){
    return JSON.parse(AES.decrypt(token, SECRET).toString(Utf8));
}

export async function isTokenValid(token:string){
    try {
        // console.log(token)
        const PAYLOAD = tokenDecoder(token);
        console.log(PAYLOAD)

        if(!PAYLOAD.payload.userId || !PAYLOAD.reference || PAYLOAD.read == null || PAYLOAD.insert == null || PAYLOAD.delete == null || PAYLOAD.update == null){
            return false;
        }

        const response = await TOKEN.findOne({
            where: {
                tokenReference: PAYLOAD.reference,
                active: true
            }
        })

        // console.log(response)
        
        if(!response){
            return false;
        }

        return true;
    } catch (error) {
        return false;
    }
}