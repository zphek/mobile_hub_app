import { Sequelize } from "sequelize";

export default (sequelize:Sequelize, DataTypes:any)=>{
    const Phone = sequelize.define('Phones', {
        phoneId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'userId'
            }
        },
        brandId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'userId'
            }
        }, 
        phoneName: {
            type: DataTypes.STRING,
        },
        phoneDescription: {
            type: DataTypes.STRING
        },
        phoneState: {
            type: DataTypes.INTEGER,
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

    return Phone;
};