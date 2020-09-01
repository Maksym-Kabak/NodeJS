const Sequelize = require('sequelize');

const sequelize = new Sequelize('carsshop', 'root', '119256', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;
