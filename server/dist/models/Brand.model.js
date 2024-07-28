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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, DataTypes) => {
    const Brand = sequelize.define('Brands', {
        categoryId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        category: {
            type: DataTypes.STRING,
            unique: true
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    });
    Brand.sync() // force: true will drop the table if it already exists
        .then(() => __awaiter(void 0, void 0, void 0, function* () {
        console.log('Table synced');
        const defaultCategories = [
            { category: 'Apple' },
            { category: 'Samsung' },
            { category: 'Huawei' },
            { category: 'Xiaomi' },
            { category: 'Oppo' },
            { category: 'Vivo' },
            { category: 'OnePlus' },
            { category: 'Motorola' },
            { category: 'Nokia' },
            { category: 'Sony' },
            { category: 'LG' },
            { category: 'Google' },
            { category: 'Asus' },
            { category: 'ZTE' },
            { category: 'Realme' }
        ];
        for (const brand of defaultCategories) {
            try {
                yield Brand.create(brand);
                console.log(`Created brand: ${brand.category}`);
            }
            catch (err) {
                console.error(`Error creating brand ${brand.category}:`, err);
            }
        }
    }))
        .catch(err => console.error('Error syncing the Brand model:', err));
    return Brand;
};
