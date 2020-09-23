const dataBase = require('../dateBase').getInstance();

module.exports = {
    getByParams: (params, userAttr) => {
        const oAuth = dataBase.getModel('OAuth');
        const User = dataBase.getModel('User');

        return oAuth.findOne({
            where: params,
            raw: true,
            nest: true,
            include: [User]
        })
    },

    create: (tokenObject) => {
        const oAuth = dataBase.getModel('OAuth');

        return oAuth.create(tokenObject, { new: true })
    },

    deleteByParams: (params) => {
        const oAuth = dataBase.getModel('OAuth');

        return oAuth.destroy({
            where: params
        })
    }
}
