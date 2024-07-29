import { Sequelize } from "sequelize";

export default (sequelize:Sequelize, DataTypes:any)=>{
    const Log = sequelize.define('Logs', {
        logId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        action: {
            type: DataTypes.STRING
        },
        userId:{
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'userId'
            }
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    })

    return Log;
};