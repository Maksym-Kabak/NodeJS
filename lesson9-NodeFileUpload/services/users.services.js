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

    createUser: async (userObject) => {
        const User = connection.getModel('User');
        return User.create(userObject, { new: true });
    },

    userUpdate: async (paramsId, data) => {
        const User = connection.getModel('User');
        return User.update(data, {
            where: { id: paramsId }
        });
    },
    userDelete: async (id) => {
        const User = connection.getModel('User');
        return User.destroy({
            where: { id }
        })

    },

    findONeByParams: (findObject) => {
        const User = connection.getModel('User');
        return User.findOne({
            where: findObject
        })
    }

}
