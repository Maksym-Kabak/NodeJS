const {Sequelize, DataTypes} = require('sequelize');
const fs = require('fs');
const path = require('path');

const {DB_NAME, DB_PASSWORD, DB_USER} = require('../configs/config');

module.exports = (() => {
    let instance;

    function initConnection() {
        const client = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
            dialect: 'mysql',
            host: 'localhost'
        });

        let models = {};

        function getModels() {
            fs.readdir(path.join(process.cwd(), 'dateBase', 'models'), (err, files) => {
                files.forEach(file => {
                    const [modelName] = file.split('.');
                    models[modelName] = (require(path.join(process.cwd(), 'dateBase', 'models', modelName)))(client, DataTypes)
                })
            })
        }

        return {
            setModels: () => getModels(),
            getModel: (modelName) => models[modelName],
            transactionInstance: () =>  client.transaction()
        }

    }

    return {
        getInstance: () => {
            if (!instance) {
                instance = initConnection()
            }
            return instance;
        }
    }
})()
