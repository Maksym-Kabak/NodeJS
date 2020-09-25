const uuid = require('uuid').v4();
const fs = require('fs-extra').promises;
const path = require('path');

const { statusCodesEnum } = require('../error');
const { usersServices, emailsServices } = require('../services');
const { hashPassword } = require('../helpers');
const { WELCOME } = require('../configs/email-action.enum');

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
            res.status(statusCodesEnum.OK).json({ user })
        } catch (e) {
            res.json(e.message)
        }

    },

    createUser: async (req, res) => {
        try {
            const { body: user, avatar } = req;
            user.password = await hashPassword(user.password);

            const newUser = await usersServices.createUser(user);

            if (avatar) {
                const photoDir = `users/${ newUser.id }/photos`;
                const fileExtension = avatar.name.split('.').pop();
                const photoName = `${ uuid }.${ fileExtension }`;

                await fs.mkdir(path.resolve(process.cwd(), 'public', `./${ photoDir }`), { recursive: true });
                await avatar.mv(path.resolve(process.cwd(), 'public', `./${ photoDir }`, `./${ photoName }`));
                await usersServices.userUpdate(newUser.id, { avatar: `${ photoDir }/${ photoName }` });
            }

            await emailsServices.sendMail(user.email, WELCOME, { userName: user.email })

            res.status(statusCodesEnum.CREATED).json(newUser);
        } catch (e) {
            res.json(e.message)
        }
    },


    updateUser: async (req, res) => {
        try {
            const { body: user, avatar } = req;
            await usersServices.userUpdate(req.params.id, req.body);


            if (avatar) {
                const photoDir = `users/${ req.params.id }/photos`;
                const fileExtension = avatar.name.split('.').pop();
                const photoName = `${ uuid }.${ fileExtension }`;
                const dir = path.resolve(process.cwd(), 'public', `./users/${ req.params.id }`);

                await fs.rmdir(dir, { recursive: true });

                await fs.mkdir(path.resolve(process.cwd(), 'public', `./${ photoDir }`), { recursive: true });
                await avatar.mv(path.resolve(process.cwd(), 'public', `./${ photoDir }`, `./${ photoName }`));
                await usersServices.userUpdate(req.params.id, { avatar: `${ photoDir }/${ photoName }` });
            }


            res.status(statusCodesEnum.OK).json(user);
        } catch (e) {
            res.json(e.message)
        }

    },

    deleteUser: async (req, res) => {
        try {
            const dir = path.resolve(process.cwd(), 'public', `./users/${ req.params.id }`);

            await usersServices.userDelete(req.params.id);
            await fs.rmdir(dir, { recursive: true });

            res.status(statusCodesEnum.OK).send('DESTROYED USER');
        } catch (e) {
            res.json(e.message)
        }
    }
}
