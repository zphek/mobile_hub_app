import { Sequelize } from "sequelize";

export default (sequelize:Sequelize, DataTypes:any)=>{
    const PhoneImages = sequelize.define('PhoneImages', {
        imageId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        phoneId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Phones',
                key: 'phoneId'
            }
        },
        imageUrl: {
            type: DataTypes.STRING
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    })

    return PhoneImages;
};