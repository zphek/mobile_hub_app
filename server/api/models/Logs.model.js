module.exports = (sequelize, DataTypes)=>{
    const Log = sequelize.define('Logs', {
        logId: {
            type: DataTypes.NUMBER,
            autoIncrement: true,
            unique: true
        },
        action: {
            type: DataTypes.STRING
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