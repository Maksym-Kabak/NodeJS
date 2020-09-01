const express = require('express');

const router = express.Router();

const controllerCars = require('../controllers/cars.controllers');
const middleware = require('../middleware/cars.middleware');


// READ
router.get('/', controllerCars.readCars);

router.get('/:id', controllerCars.carById);
// CREATE
router.post('/', middleware.carsValidity, controllerCars.createCar)
// UPDATE
router.put('/:id', middleware.carsValidity, controllerCars.updateCar);
// DELETE

router.delete('/:id', controllerCars.deleteCar);


module.exports = router;


