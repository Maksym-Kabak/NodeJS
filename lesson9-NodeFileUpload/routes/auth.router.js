const { Router } = require('express');
const authRouter = Router();

const { controllerAuth } = require('../controllers');
const { userMiddleware, tokenMiddleware } = require('../middleware')

authRouter.post('/', userMiddleware.userPresent, controllerAuth.login);
authRouter.post('/refresh', tokenMiddleware.checkRefresh, controllerAuth.refreshToken);

module.exports = authRouter;


