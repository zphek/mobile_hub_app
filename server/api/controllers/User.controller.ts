import { Request, Response } from "express";
import UserService from "../services/User.service";
import { JWTdecoder } from "../utilities/jwtencoder";
import { tokenDecoder } from "../utilities/tokenHandler";

class UserController {
    async userLogin(req: Request, res: Response) {
        try {
            const response = await UserService.userLogin(req.body);
            return res.json(response);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async userRegister(req: Request, res: Response) {
        try {
            const response = await UserService.userRegister(req.body);
            return res.json(response);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async getLogs(req: Request, res: Response) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ message: 'Authorization header is missing or invalid.', error: true });
            }

            const token = authHeader.split(' ')[1];
            let payload;
            
            try {
                payload = JWTdecoder(token)?.payload || tokenDecoder(token).payload;
            } catch (error) {
                return res.status(401).json({ message: 'Invalid token.', error: true });
            }

            const response = await UserService.getLogs(payload.userId);
            return res.json(response);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

export default new UserController();
