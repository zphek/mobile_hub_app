import jwt from "jsonwebtoken";

const SECRET = "kmGoDr2HWP"

export async function JWTencoder(payload:any){
    const JWT = jwt.sign(payload, SECRET, { expiresIn: "1h" });
    console.log(JWT);
    return JWT; 
}

export function JWTdecoder(token: string) {
    try {
        const decoded = jwt.decode(token, { complete: true });
        return decoded;
    } catch (error) {
        // console.error('JWT decoding failed:', error);
        return null;
    }
}

export function JWTchecker(token: string) {
    try {
        jwt.verify(token, SECRET);
        return true;
    } catch (error) {
        // console.error('JWT verification failed:', error);
        return false;
    }
}