const {Router} = require('express');
const usersRouter = Router();

const {controllerUsers} = require('../controllers');
const {checkUserValidityMidlleware} = require('../middleware');

// READ
usersRouter.get('/', controllerUsers.readUsers);
usersRouter.get('/:id', controllerUsers.userById);

// CREATE
usersRouter.post('/', checkUserValidityMidlleware, controllerUsers.createUser)
// UPDATE
usersRouter.put('/:id', checkUserValidityMidlleware, controllerUsers.updateUser);
// DELETE
usersRouter.delete('/:id', controllerUsers.deleteUser);


module.exports = usersRouter;


