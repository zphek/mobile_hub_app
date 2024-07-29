import { Sequelize } from "sequelize";

export default (sequelize:Sequelize, DataTypes:any) => {
    const Token = sequelize.define('Tokens', {
        tokenId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tokenReference: {
            type: DataTypes.STRING,
            unique: true
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'userId'
            }
        },
        active: {
            type: DataTypes.BOOLEAN
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    })

    return Token;
};