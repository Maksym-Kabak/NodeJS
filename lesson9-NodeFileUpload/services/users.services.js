const connection = require('../dateBase').getInstance();
module.exports = {

    fetchAllUsers: async () => {
        const User = connection.getModel('User');
        return User.findAll({})
    },

    fetchUserId: async (paramsId) => {
        const User = connection.getModel('User');
        return User.findByPk(paramsId);
    },

    createUser: async (userObject, transaction) => {
        const User = connection.getModel('User');
        return User.create(userObject, { new: true, transaction });
    },

    userUpdate: async (id, data, transaction) => {
        const User = connection.getModel('User');
        return User.update(data, {
            where: { id },
            transaction
        });
    },
    userDelete: async (id, transaction) => {
        const User = connection.getModel('User');
        return User.destroy({
            where: { id },
            transaction
        })

    },

    findONeByParams: (findObject) => {
        const User = connection.getModel('User');
        return User.findOne({
            where: findObject
        })
    }

}
