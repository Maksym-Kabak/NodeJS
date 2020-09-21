const path = require('path');
const { OAUTH } = require('../../configs/db-tables.enum');

module.exports = (sequalize, DataTypes) => {
    const OAuth = sequalize.define('OAuth', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        access_token: {
            type: DataTypes.STRING
        },
        refresh_token: {
            type: DataTypes.STRING
        },
        user_id: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        created_at: {
            type: DataTypes.STRING,
            default: new Date().toISOString()
        }

    }, {
        tableName: OAUTH,
        timestamps: false,
    });

    const User = (require(path.join(process.cwd(), 'dateBase', 'models', 'User')))(sequalize, DataTypes)
    OAuth.belongsTo(User, { foreignKey: 'user_id' });

    return OAuth;
};
