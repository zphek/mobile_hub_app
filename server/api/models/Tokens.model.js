module.exports = (sequelize, DataTypes) => {
    const Token = sequelize.define('Tokens', {
        tokenId: {
            type: DataTypes.NUMBER,
            autoIncrement: true,
            unique: true
        },
        token: {
            type: DataTypes.STRING,
            unique: true
        },
        userId: {
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

    return Token;
};