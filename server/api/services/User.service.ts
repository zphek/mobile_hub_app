import { DataTypes } from "sequelize";
import models from "../models/index";
import model from "../models/User.model";
import model2 from "../models/Logs.model"
import rstring from 'randomstring';
import { comparePassword, encryptPassword } from "../utilities/encrypt";
import { JWTencoder } from "../utilities/jwtencoder";

const User = model(models.sequelize, DataTypes);
const Log = model2(models.sequelize, DataTypes)

interface LoginParams {
    email: string;
    password: string;
}

interface RegisterParams {
    email: string;
    password: string;
    imageUrl: string;
}

class userService {
    async userLogin(body: LoginParams) {
        return new Promise((resolve, reject) => {
            if (!body.email || !body.password) {
                reject({ message: "Email and password are required." });
                return;
            }

            User.findOne({
                where: {
                    email: body.email
                }
            })
            .then(async (response: any) => {
                if (response) {
                    if (comparePassword(body.password, response.dataValues.password, response.dataValues.passwordHash)) {
                        const token = await JWTencoder(response.dataValues);
                        resolve({ message: "User logged in.", logged: true, token });
                        return;
                    }

                    reject({ message: "Username or password are incorrect.", logged: false });
                    return;
                }

                reject({ message: "Username doesn't exist.", logged: false });
                return;
            })
            .catch((response) => {
                reject(response);
            });
        });
    }
    
    async userRegister(body: RegisterParams) {
        if (!body.email || !body.password) {
            return Promise.reject({ message: "Email, password are required." });
        }

        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findOne({
                    where: {
                        email: body.email
                    }
                });

                if (user) {
                    reject({ message: "Use another email to register, this one is already registered.", error: true });
                    return;
                }

                const hash = rstring.generate(15);
                
                User.create({
                    userId: null,
                    email: body.email,
                    password: encryptPassword(body.password, hash),
                    passwordHash: hash,
                    imageUrl: "",
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
                .then((response) => {
                    resolve({ message: `The user with email ${body.email} has successfully created an account.` });
                })
                .catch((error) => {
                    console.log(error)
                    reject(error);
                });
            } catch (error) {
                console.log(error)
                reject(error);
            }
        });
    }

    async getLogs(userId: number){
        return new Promise((resolve, reject)=>{
            Log.findAll({
                where: {
                    userId
                }
            })
            .then((response)=>{
                if(response){
                    resolve({ data: response, error: false })
                }
            })
            .catch((err)=>{
                reject({ err, error: true })
            })

        })
    }
}

export default new userService();
