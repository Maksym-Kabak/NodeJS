const { errors, ErrorHandler , statusCodes } = require('../error');


module.exports = (req, res, next) => {
    const car = req.body;
    try {
        if (!car.model) {
            return next(new ErrorHandler(
                errors.BAD_REQUEST_NOT_VALID_CAR_MODEL.message,
                statusCodes.BAD_REQUEST,
                errors.BAD_REQUEST_NOT_VALID_CAR_MODEL.code));
        }
        if (!(car.year) ) {
            return next(new ErrorHandler(
                errors.BAD_REQUEST_NOT_VALID_CAR_YEAR.message,
                statusCodes.BAD_REQUEST,
                errors.BAD_REQUEST_NOT_VALID_CAR_YEAR.code));
        }
        if (!car.price) {
            return next(new ErrorHandler(
                errors.BAD_REQUEST_NOT_VALID_CAR_PRICE.message,
                statusCodes.BAD_REQUEST,
                errors.BAD_REQUEST_NOT_VALID_CAR_PRICE.code));
        }
        next();
    } catch (e) {
        next(e.message);
    }
}
