const {errors, ErrorHandler, statusCodesEnum} = require('../error');
const {carValidator} = require('../validators');

module.exports =  (req, res, next) => {
        try {
            const car = req.body;
            const {error} = carValidator.newCarValidator.validate(car);

            if (error) {
                return next(new ErrorHandler(error.details[0].message,
                    statusCodesEnum.BAD_REQUEST,
                    errors.BAD_REQUEST_NOT_VALID_USER.code))
            }
            next();
        } catch (e) {
            next(e.message);
        }

    }


