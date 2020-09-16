const { passwordComparator } = require('../helpers');

module.exports = {
    login: async  (req, res, next) => {
        try {
            const user = req.user;
            const  { password } = req.body;

            await  passwordComparator(password, user.password);

            res.json('Login successful ');
        }catch (e) {
            next(e)
        }
    }
}
