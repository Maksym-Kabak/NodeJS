const {statusCodesEnum} = require('../error');
const {usersServices} = require('../services');
const { hashPassword } = require('../helpers');
module.exports = {

    readUsers: async (req, res) => {
        try {
            const user = await usersServices.fetchAllUsers();
            res.status(statusCodesEnum.OK).json(user);
        } catch (e) {
            res.json(e.message)
        }
    },
    userById: async (req, res) => {
        try {
            const user = await usersServices.fetchUserId(req.params.id)
            res.status(statusCodesEnum.OK).json({user})
        } catch (e) {
            res.json(e.message)
        }

    },

    createUser: async (req, res) => {
        try {
            const user = req.body;
            user.password = await hashPassword(user.password);

            const NewUser = await usersServices.createUser(user);
            res.status(statusCodesEnum.CREATED).json(NewUser);
        } catch (e) {
            res.json(e.message)
        }
    },

    updateUser: async (req, res) => {
        try {
            const user = await usersServices.userUpdate(req.params.id, req.body);
            res.status(statusCodesEnum.OK).json(user);
        } catch (e) {
            res.json(e.message)
        }

    },

    deleteUser: async (req, res) => {
        try {
            await usersServices.userDelete(req.params.id);
            res.status(statusCodesEnum.OK).send('DESTROYED USER');
        } catch (e) {
            res.json(e.message)
        }

    }
}
