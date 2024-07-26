module.exports = (sequelize, DataTypes)=>{
    const Phone = sequelize.define('Phones', {
        phoneId: {
            type: DataTypes.NUMBER,
            autoIncrement: true,
            unique: true
        },
        userId: {
            type: DataTypes.NUMBER
        },
        phoneName: {
            type: DataTypes.STRING,
        },
        phoneDescription: {
            type: DataTypes.STRING
        },
        phoneState: {
            type: DataTypes.NUMBER,
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