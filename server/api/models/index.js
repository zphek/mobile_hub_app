const { Sequelize } = require("sequelize")

const sequelize = new Sequelize('verceldb', 'default', 'W4LJIHrpEoD3', {
    host: "ep-quiet-glitter-a4b00sct-pooler.us-east-1.aws.neon.tech",
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // This line can be removed if you have proper certificates.
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

module.exports = sequelize;