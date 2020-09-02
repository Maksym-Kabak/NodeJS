const carsServices = require('../services/cars.services');
module.exports = {

    readCars: async (req, res) => {
        try {
            const cars = await carsServices.fetchAllCars();
            res.status(200).json(cars);
        } catch (e) {
            res.json(e.message)
        }
    },
    carById: async (req, res) => {
        try {
          const car = await carsServices.fetchCarId(req.params.id)
            res.status(200).json( {car} )
        } catch (e) {
            res.json(e.message)
        }

    },

    createCar: async (req, res) => {
        try {
            const car = await carsServices.createCars(req.body);
            res.status(201).json(car);
        } catch (e) {
            res.json(e.message)
        }
    },

    updateCar: async (req, res) => {
        try {
            const car = await carsServices.carUpdate(req.params.id, req.body);
            res.status(200).json(car);
        } catch (e) {
            res.json(e.message)
        }

    },

    deleteCar: async (req, res) => {
        try {
          await carsServices.carDelete(req.params.id);
            res.status(200).send('DESTROYED CARS');
        }catch (e) {
            res.json(e.message)
        }

    }
}
