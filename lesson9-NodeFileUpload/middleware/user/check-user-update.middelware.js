const { errors, ErrorHandler, statusCodesEnum } = require('../../error');
const { userValidator } = require('../../validators');

module.exports = (req, res, next) => {
    try {
        const user = req.body;

        const { error } = userValidator.updateUserValidator.validate(user);

        if (error) {
            return next(new ErrorHandler(error.details[0].message,
                statusCodesEnum.BAD_REQUEST,
                errors.BAD_REQUEST_NOT_VALID_USER.code))
        }

        next();
    } catch (e) {
        next(e);
    }
}
