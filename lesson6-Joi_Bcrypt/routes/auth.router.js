const {Router} = require('express');
const authRouter = Router();

const {controllerAuth} = require('../controllers');
const {checkIsUserPresentMidlleware} = require('../middleware')

authRouter.post( '/', checkIsUserPresentMidlleware, controllerAuth.login);

module.exports = authRouter;


