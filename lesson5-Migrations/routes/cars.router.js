const { Router } = require('express');
const carRouter = Router();

const { controllerCars } = require('../controllers');
const {checkCarValidityMidlleware} = require('../middleware');


// READ
carRouter.get('/', controllerCars.readCars);

carRouter.get('/:id', controllerCars.carById);
// CREATE
carRouter.post('/',checkCarValidityMidlleware, controllerCars.createCar)
// UPDATE
carRouter.put('/:id', checkCarValidityMidlleware, controllerCars.updateCar);
// DELETE

carRouter.delete('/:id', controllerCars.deleteCar);


module.exports = carRouter;


