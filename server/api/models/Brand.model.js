module.exports = (sequelize, DataTypes) => {
    const Brand = sequelize.define('Brands', {
        categoryId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
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
    });

    Brand.sync() // force: true will drop the table if it already exists
        .then(async () => {
            console.log('Table synced');
            const defaultCategories = [
                { category: 'Apple' },
                { category: 'Samsung' },
                { category: 'Huawei' },
                { category: 'Xiaomi' },
                { category: 'Oppo' },
                { category: 'Vivo' },
                { category: 'OnePlus' },
                { category: 'Motorola' },
                { category: 'Nokia' },
                { category: 'Sony' },
                { category: 'LG' },
                { category: 'Google' },
                { category: 'Asus' },
                { category: 'ZTE' },
                { category: 'Realme' }
            ];

            for (const brand of defaultCategories) {
                try {
                    await Brand.create(brand);
                    console.log(`Created brand: ${brand.category}`);
                } catch (err) {
                    console.error(`Error creating brand ${brand.category}:`, err);
                }
            }
        })
        .catch(err => console.error('Error syncing the Brand model:', err));

    return Brand;
};
