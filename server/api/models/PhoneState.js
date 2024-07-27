module.exports = (sequelize, DataTypes)=>{
    const PhoneState = sequelize.define('PhoneStates', {
        stateId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        state: {
            type: DataTypes.STRING
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    })

    return PhoneState;
};