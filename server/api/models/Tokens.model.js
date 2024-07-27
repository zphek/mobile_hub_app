module.exports = (sequelize, DataTypes) => {
    const Token = sequelize.define('Tokens', {
        tokenId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        token: {
            type: DataTypes.STRING,
            unique: true
        },
        userId: {
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

    return Token;
};