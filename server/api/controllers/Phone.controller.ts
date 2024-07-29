import { Request, Response } from "express";
import PhoneService from "../services/Phone.service";
import { JWTdecoder } from "../utilities/jwtencoder";
import { tokenDecoder } from "../utilities/tokenHandler";
import models from "../models/index";
import model from "../models/Logs.model";
import { DataTypes } from "sequelize";

const Log = model(models.sequelize, DataTypes);

class PhoneController {
    async createPhone(req: Request, res: Response) {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            const payload: any = JWTdecoder(token)?.payload || tokenDecoder(token)?.payload;
            const body = { ...req.body, payload };

            console.log(payload);

            const response = await PhoneService.createPhone(body, req.files);

            await Log.create({
                logId: null,
                action: `NEW - ${body.phoneName} was added.`,
                userId: payload.userId,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            return res.json(response);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async getPhones(req: Request, res: Response) {
        try {
            if (!req.query.page) {
                return res.status(400).json({ message: "You have to specify the page you want to see.", error: true });
            }

            const page = parseInt(req.query.page as string);
            if (page < 1) {
                return res.status(400).json({ message: "The page number can't be less than 1.", error: true });
            }

            const token = req.headers.authorization?.split(' ')[1];
            const payload: any = JWTdecoder(token)?.payload || tokenDecoder(token)?.payload;
            const response = await PhoneService.getPhones(payload.userId, page);

            await Log.create({
                logId: null,
                action: `GET - Phones listed by user ${payload.userId}.`,
                userId: payload.userId,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            return res.json(response);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async getPhone(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: "The id param is missing.", error: true });
            }

            const token = req.headers.authorization?.split(' ')[1];
            const payload: any = JWTdecoder(token)?.payload || tokenDecoder(token)?.payload;
            const response = await PhoneService.getPhone(id, payload.userId);

            return res.json(response);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async deletePhone(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: "The id phone param is missing.", error: true });
            }

            const token = req.headers.authorization?.split(' ')[1];
            const payload: any = JWTdecoder(token)?.payload || tokenDecoder(token)?.payload;

            console.log(payload);

            const response = await PhoneService.deletePhone(parseInt(id), payload.userId);

            return res.json(response);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async loadPhones(req: Request, res: Response) {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            const payload: any = JWTdecoder(token)?.payload || tokenDecoder(token)?.payload;
        
            const response = PhoneService.loadPhones(payload.userId)

            return res.json(response);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async updatePhone(req: Request, res: Response) {
        // Implementar lógica aquí
    }

    async deletePhones(req: Request, res: Response) {
        // Implementar lógica aquí
    }
}

export default new PhoneController();
