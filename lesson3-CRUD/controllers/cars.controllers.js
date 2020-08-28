
const carsServices = require('../services/cars.services')

module.exports = {

    readCars: (req, res) => {
        const cars = carsServices.fetchAllCars();
        res.status(200).json(cars);
    },
    carById: (req, res) => {
        const found = carsServices.fetchCarId(req.params.id);
        if (found) {
            res.status(200).json(found)
        } else {
            res.sendStatus(404);
        }
    },

    createCar:  (req, res) => {
        const newCar = carsServices.createCars(req.body)
        res.status(201).json(newCar);
    },

    updateCar: (req, res) => {
        const found = carsServices.carUpdate(req.params.id, req.body)
        if(found){
            res.sendStatus(404);
        } else {
            res.sendStatus(204);
        }
    },

    deleteCar: (req, res) => {
        carsServices.carDelete(req.params.id)
        res.sendStatus(204);
    }
}
