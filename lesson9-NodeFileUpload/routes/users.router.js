const { Router } = require('express');
const usersRouter = Router();

const { controllerUsers } = require('../controllers');
const { userMiddleware, filesMiddleware } = require('../middleware');

// READ
usersRouter.get('/', controllerUsers.readUsers);
usersRouter.get('/:id', controllerUsers.userById);

// CREATE
usersRouter.post(
    '/',
    userMiddleware.userValidity,
    filesMiddleware.checkFileMiddleware,
    filesMiddleware.checkUserPhotoCountMiddleware,
    controllerUsers.createUser
)
// UPDATE
usersRouter.put(
    '/:id',
    userMiddleware.userUpdate,
    filesMiddleware.checkFileMiddleware,
    filesMiddleware.checkUserPhotoCountMiddleware,
    controllerUsers.updateUser);
// DELETE
usersRouter.delete('/:id', controllerUsers.deleteUser);


module.exports = usersRouter;


