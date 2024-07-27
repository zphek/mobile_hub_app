const { Sequelize, DataTypes } = require("sequelize")
require("dotenv").config()

const sequelize = new Sequelize(process.env.POSTGRES_DATABASE, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

(async ()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
})()

const models = {
    User: require("./User.model")(sequelize, DataTypes),
    Logs: require("./Logs.model")(sequelize, DataTypes),
    Phones: require("./Phones.model")(sequelize, DataTypes),
    PhoneState: require("./PhoneState")(sequelize, DataTypes),
    Tokens: require("./Tokens.model")(sequelize, DataTypes),
    Category: require("./Brand.model")(sequelize, DataTypes),
    sequelize
}

module.exports = models;