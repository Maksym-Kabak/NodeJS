const { Sequelize, DataTypes} = require('sequelize');
const fs = require('fs');
const path = require('path');

module.exports = (() => {
    let instance;

    function initConnection() {
        const client = new Sequelize('carsshop', 'root', '119256', {
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
            getModel: (modelName) => models[modelName]
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
