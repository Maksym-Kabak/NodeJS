const { Router } = require('express');
const usersRouter = Router();

const { controllerUsers } = require('../controllers');
const { userMiddleware } = require('../middleware');

// READ
usersRouter.get('/', controllerUsers.readUsers);
usersRouter.get('/:id', controllerUsers.userById);

// CREATE
usersRouter.post('/', userMiddleware.userValidity, controllerUsers.createUser)
// UPDATE
usersRouter.put('/:id', userMiddleware.userValidity, controllerUsers.updateUser);
// DELETE
usersRouter.delete('/:id', controllerUsers.deleteUser);


module.exports = usersRouter;


