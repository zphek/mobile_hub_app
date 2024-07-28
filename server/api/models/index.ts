import { Sequelize, DataTypes } from "sequelize";

import userModel from "./User.model";
import logsModel from "./Logs.model";
import phoneModel from "./Phones.model"
import phoneStateModel from "./PhoneState"
import tokenModel from "./Tokens.model";
import brandModel from "./Brand.model";
import PhoneImagesModel from "./PhoneImages.model";


import dotenv from "dotenv";
dotenv.config()

const sequelize = new Sequelize(process.env.POSTGRES_DATABASE, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

(async ()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
})()

const models = {
    User: userModel(sequelize, DataTypes),
    Logs: logsModel(sequelize, DataTypes),
    Phones: phoneModel(sequelize, DataTypes),
    PhoneState: phoneStateModel(sequelize, DataTypes),
    PhoneImages: PhoneImagesModel(sequelize, DataTypes),
    Tokens: tokenModel(sequelize, DataTypes),
    Brand: brandModel(sequelize, DataTypes),
    sequelize
}

// Phones -> Users relation.
models.User.hasOne(models.Phones, {
    foreignKey: "userId"
})

models.Phones.belongsTo(models.User)

// Phones -> Brands relation.
models.Brand.hasOne(models.Phones, {
    foreignKey: "brandId"
})

models.Phones.belongsTo(models.Brand)


// Phones Images -> Phones relation.

models.Phones.hasMany(models.PhoneImages, {
    foreignKey: "phoneId"
})

models.PhoneImages.belongsTo(models.Phones)

export default models;