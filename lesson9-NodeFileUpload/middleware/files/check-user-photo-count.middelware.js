const { errors, ErrorHandler } = require('../../error');

module.exports = (req, res, next) => {
    try {
        if (!req.photos){
            return next();
        }

        if (req.photos.length > 1) {
            return next(new ErrorHandler(errors.NOT_VALID_FILES))
        }

        req.avatar = req.photos[0];
        next();
    } catch (e) {
        next(e);
    }
}
