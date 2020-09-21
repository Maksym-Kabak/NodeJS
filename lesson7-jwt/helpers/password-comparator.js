const bcrypt = require('bcrypt');
const {errors, statusCodesEnum , ErrorHandler} = require('../error')

module.exports = async  (password, hashedPassword) => {
    const isPasswordEquals =  await bcrypt.compare(password, hashedPassword);

    if (!isPasswordEquals) {
       throw new ErrorHandler(
            errors.NOT_FOUND_USER.message,
            statusCodesEnum.NOT_FOUND,
            errors.NOT_FOUND_USER.code);
    }
}
