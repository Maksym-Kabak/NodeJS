const { DataTypes } = require('sequelize');

const { USERS, OAUTH } = require('../../configs/db-tables.enum')

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('OAuth', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },

            access_token: {
                type: DataTypes.STRING,
                allowNull: false
            },

            refresh_token: {
                type: DataTypes.STRING,
                allowNull: false
            },

            user_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: USERS,
                    key: 'id'
                }
            },

            created_at: {
                type: DataTypes.STRING,
                default: new Date().toISOString()
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable(OAUTH);
    }
};
