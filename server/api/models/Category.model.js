module.exports = (sequelize, DataTypes)=>{
    const Brand = sequelize.define('Brands', {
        categoryId: {
            type: DataTypes.NUMBER,
            autoIncrement: true,
            unique: true
        },
        category: {
            type: DataTypes.STRING,
            unique: true
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    })

    return Brand;
};