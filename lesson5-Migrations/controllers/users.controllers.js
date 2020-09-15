const {statusCodes} = require('../error');
const { usersServices } = require('../services');
module.exports = {

    readUsers: async (req, res) => {
        try {
            const user = await usersServices.fetchAllUsers();
            res.status(statusCodes.OK).json(user);
        } catch (e) {
            res.json(e.message)
        }
    },
    userById: async (req, res) => {
        try {
            const user = await usersServices.fetchUserId(req.params.id)
            res.status(statusCodes.OK).json( {user} )
        } catch (e) {
            res.json(e.message)
        }

    },

    createUser: async (req, res) => {
        try {
            const user = await usersServices.createUser(req.body);
            res.status(statusCodes.CREATED).json(user);
        } catch (e) {
            res.json(e.message)
        }
    },

    updateUser: async (req, res) => {
        try {
            const user = await usersServices.userUpdate(req.params.id, req.body);
            res.status(statusCodes.OK).json(user);
        } catch (e) {
            res.json(e.message)
        }

    },

    deleteUser: async (req, res) => {
        try {
            await usersServices.userDelete(req.params.id);
            res.status(statusCodes.OK).send('DESTROYED USER');
        }catch (e) {
            res.json(e.message)
        }

    }
}
