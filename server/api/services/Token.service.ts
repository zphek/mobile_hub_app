import { DataTypes } from "sequelize";
import models from "../models/index";
import model from "../models/Tokens.model";

const Token = model(models.sequelize, DataTypes);

class tokenService{
    createToken(userId: number, ){

    }

    deleteToken(){

    }
}

export default new tokenService();