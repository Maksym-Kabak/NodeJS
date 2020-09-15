const {errors, ErrorHandler, statusCodes} = require('../error');

module.exports = (req, res, next) => {
    const user = req.body;

    try {
        if (!user.name) {
            return next(new ErrorHandler(
                errors.BAD_REQUEST_NOT_VALID_USER_NAME.message,
                statusCodes.BAD_REQUEST,
                errors.BAD_REQUEST_NOT_VALID_USER_NAME.code));
        }
        if (!user.email) {
            return next(new ErrorHandler(
                errors.BAD_REQUEST_NOT_VALID_USER_NAME.message,
                statusCodes.BAD_REQUEST,
                errors.BAD_REQUEST_NOT_VALID_USER_NAME.code));
        }
        if (!user.password) {
            return next(new ErrorHandler(
                errors.BAD_REQUEST_NOT_VALID_USER_NAME.message,
                statusCodes.BAD_REQUEST,
                errors.BAD_REQUEST_NOT_VALID_USER_NAME.code));
        }
        next();
    } catch (e) {
        next(e);
    }
}
