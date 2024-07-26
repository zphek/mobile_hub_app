module.exports = (sequelize, DataTypes)=>{
    const PhoneState = sequelize.define('PhoneStates', {
        stateId: {
            type: DataTypes.NUMBER,
            autoIncrement: true,
            unique: true
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