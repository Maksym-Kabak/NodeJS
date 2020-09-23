const { AUTHORIZATION } = require('../configs/constants');
const { passwordComparator, tokinazer } = require('../helpers');
const { oAuthServices } = require('../services');

module.exports = {
    login: async (req, res, next) => {
        try {
            const user = req.user;
            const { password } = req.body;

            await passwordComparator(password, user.password);

            const tokens = tokinazer();

            await oAuthServices.create({
                ...tokens,
                user_id: user.id
            })

            res.json(tokens);
        } catch (e) {
            next(e)
        }
    },

    refreshToken: async (req, res, next) => {
        try {
            const user = req.user;
            const token = req.get(AUTHORIZATION);
            const newTokensPair = tokinazer();

            await oAuthServices.deleteByParams({ refresh_token: token })

            await oAuthServices.create({
                ...newTokensPair,
                user_id: user.id
            })

            res.json(newTokensPair)
        } catch (e) {
            next(e)
        }
    }
}
