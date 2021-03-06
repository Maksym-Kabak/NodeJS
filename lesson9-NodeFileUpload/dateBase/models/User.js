module.exports = (sequalize, DataTypes) => {
    const User = sequalize.define('User', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull:false,
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull:false,
            unique: true
        },
        password:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        avatar: {
            type: DataTypes.STRING,
        },

    },{
        tableName: 'users',
        timestamps: false,
    });
    return User;
};
