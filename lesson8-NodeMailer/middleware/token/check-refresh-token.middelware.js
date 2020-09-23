const jwt = require('jsonwebtoken');

const { REFRESH_TOKEN_SECRET } = require('../../configs/config');
const { AUTHORIZATION } = require('../../configs/constants');
const { ErrorHandler ,errors ,statusCodesEnum} = require('../../error');
const { oAuthServices } = require('../../services');

module.exports = async (req, res, next) => {
    const token = req.get(AUTHORIZATION);

    if (!token) {
        return next(new ErrorHandler(
            errors.NOT_VALID_TOKEN,
            statusCodesEnum.UNAUTHORIZED))
    }

    jwt.verify(token, REFRESH_TOKEN_SECRET, err => {
        if (err) {
            return next(new ErrorHandler(
                errors.NOT_VALID_TOKEN,
                statusCodesEnum.UNAUTHORIZED
            ))
        }
    });

    const tokens = await oAuthServices.getByParams({ refresh_token: token });

    if (!token) {
        return next(new ErrorHandler(
            errors.NOT_VALID_TOKEN,
            statusCodesEnum.UNAUTHORIZED
        ))
    }

    req.user = tokens.User

    next();

}
