const carsServices = require('../services/cars.services');

const Cars = require('../models/cars.models');

module.exports = {

    readCars: (req, res) => {
        carsServices.fetchAllCars(res);

    },
    carById: (req, res) => {
        carsServices.fetchCarId(req, res)
    },

    createCar: (req, res) => {
        carsServices.createCars(req.body);
        res.status(201).end('Car created');
    },

    updateCar: (req, res) => {
        carsServices.carUpdate(req.params.id, req.body);
        res.status(200).end('Car Updated');
    },

    deleteCar: (req, res) =>{
        carsServices.carDelete(req);
        res.status(200).end('DESTROYED CARS');
    }
}
