
import {AES} from "crypto-js"
import Utf8 from 'crypto-js/enc-utf8';

const SECRET = "123456789"

export function encryptPassword(password: string, passwordHash: string){
    return AES.encrypt(password, SECRET + passwordHash).toString();
}

export function comparePassword(plainPassword:string, hashedPassword:string, hash: string){
    // console.log(AES.decrypt(hashedPassword, SECRET + hash).toString(Utf8), plainPassword, hashedPassword)
    return AES.decrypt(hashedPassword, SECRET + hash).toString(Utf8) == plainPassword;
}
