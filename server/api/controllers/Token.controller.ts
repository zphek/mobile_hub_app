import { Request, Response } from "express";
import { JWTdecoder } from "../utilities/jwtencoder";
import TokenService from "../services/Token.service";
import { v4 } from "uuid";

class TokenController {
    async createToken(req: Request, res: Response) {
        try {
            if (req.body.read == null || req.body.insert == null || req.body.update == null || req.body.delete == null) {
                return res.status(400).json({ message: 'The fields read, insert, update, and delete are required.', error: true });
            }

            const { payload }: any = JWTdecoder(req.headers.authorization?.split(' ')[1]);
            const body = { ...req.body, payload, reference: v4() };

            const response = await TokenService.createToken(body);
            return res.json(response);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async getTokens(req: Request, res: Response) {
        try {
            const { payload }: any = JWTdecoder(req.headers.authorization?.split(' ')[1]);

            const response = await TokenService.getTokens(payload.userId);
            return res.json(response);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async deleteToken(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ message: "The id parameter is missing.", error: true });
            }

            const { payload }: any = JWTdecoder(req.headers.authorization?.split(' ')[1]);

            const response = await TokenService.deleteToken(id, payload.userId);
            return res.json(response);
        } catch (err) {
            return res.status(500).json(err);
        }
    }
}

export default new TokenController();
