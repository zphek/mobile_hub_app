"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const User_model_1 = __importDefault(require("./User.model"));
const Logs_model_1 = __importDefault(require("./Logs.model"));
const Phones_model_1 = __importDefault(require("./Phones.model"));
const PhoneState_1 = __importDefault(require("./PhoneState"));
const Tokens_model_1 = __importDefault(require("./Tokens.model"));
const Brand_model_1 = __importDefault(require("./Brand.model"));
const PhoneImages_model_1 = __importDefault(require("./PhoneImages.model"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sequelize = new sequelize_1.Sequelize(process.env.POSTGRES_DATABASE, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        console.log('Connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}))();
const models = {
    User: (0, User_model_1.default)(sequelize, sequelize_1.DataTypes),
    Logs: (0, Logs_model_1.default)(sequelize, sequelize_1.DataTypes),
    Phones: (0, Phones_model_1.default)(sequelize, sequelize_1.DataTypes),
    PhoneState: (0, PhoneState_1.default)(sequelize, sequelize_1.DataTypes),
    PhoneImages: (0, PhoneImages_model_1.default)(sequelize, sequelize_1.DataTypes),
    Tokens: (0, Tokens_model_1.default)(sequelize, sequelize_1.DataTypes),
    Brand: (0, Brand_model_1.default)(sequelize, sequelize_1.DataTypes),
    sequelize
};
// Phones -> Users relation.
models.User.hasOne(models.Phones, {
    foreignKey: "userId"
});
models.Phones.belongsTo(models.User);
// Phones -> Brands relation.
models.Brand.hasOne(models.Phones, {
    foreignKey: "brandId"
});
models.Phones.belongsTo(models.Brand);
// Phones Images -> Phones relation.
models.Phones.hasMany(models.PhoneImages, {
    foreignKey: "phoneId"
});
models.PhoneImages.belongsTo(models.Phones);
exports.default = models;
