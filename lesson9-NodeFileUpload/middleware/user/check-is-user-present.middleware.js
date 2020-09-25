const { errors, ErrorHandler, statusCodesEnum } = require('../../error');
const { usersServices } = require('../../services');


module.exports = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await usersServices.findONeByParams({ email })

        if (!user) {
            return next(new ErrorHandler(
                errors.NOT_FOUND_USER.message,
                statusCodesEnum.NOT_FOUND,
                errors.NOT_FOUND_USER.code));
        }

        req.user = user;
        next();
    } catch (e) {
        next(e);
    }
}
