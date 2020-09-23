const { Router } = require('express');
const carRouter = Router();

const { controllerCars } = require('../controllers');
const { carMiddleware, tokenMiddleware } = require('../middleware');


// READ
carRouter.get('/', controllerCars.readCars);

carRouter.get('/:id', controllerCars.carById);
// CREATE
carRouter.post('/', carMiddleware.carValidity, tokenMiddleware.checkAccess, controllerCars.createCar)
// UPDATE
carRouter.put('/:id', carMiddleware.carValidity, controllerCars.updateCar);
// DELETE

carRouter.delete('/:id', controllerCars.deleteCar);


module.exports = carRouter;


