const jwt = require('jsonwebtoken');

const { ACCESS_TOKEN_SECRET } = require('../../configs/config');
const { AUTHORIZATION } = require('../../configs/constants');
const { oAuthServices } = require('../../services');
const { ErrorHandler, errors, statusCodesEnum } = require('../../error');

module.exports = async (req, res, next) => {
    const token = req.get(AUTHORIZATION);

    if (!token) {
        return next(new ErrorHandler(
            errors.NOT_VALID_TOKEN,
            statusCodesEnum.UNAUTHORIZED
        ))
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET, err => {
        if (err) {
            return next(new ErrorHandler(
                errors.NOT_VALID_TOKEN,
                statusCodesEnum.UNAUTHORIZED
            ))
        }
    });

    const tokenWithUser = await oAuthServices.getByParams({ access_token: token });


    req.user = tokenWithUser.User;

    next();

}
