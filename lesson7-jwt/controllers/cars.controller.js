const { carsServices } = require('../services');
const { statusCodesEnum } = require('../error');

module.exports = {

    readCars: async (req, res) => {
        try {
            const cars = await carsServices.fetchAllCars();
            res.status(statusCodesEnum.OK).json(cars);
        } catch (e) {
            res.json(e.message)
        }
    },
    carById: async (req, res) => {
        try {
            const car = await carsServices.fetchCarId(req.params.id)
            res.status(statusCodesEnum.OK).json({ car })
        } catch (e) {
            res.json(e.message)
        }

    },

    createCar: async (req, res) => {
        try {
            const { body, user } = req;
            const car = await carsServices.createCars({ ...body, user_id: user.id });
            res.status(statusCodesEnum.CREATED).json(car);
        } catch (e) {
            res.json(e.message)
        }
    },

    updateCar: async (req, res) => {
        try {
            const car = await carsServices.carUpdate(req.params.id, req.body);
            res.status(statusCodesEnum.OK).json(car);
        } catch (e) {
            res.json(e.message)
        }

    },

    deleteCar: async (req, res) => {
        try {
            await carsServices.carDelete(req.params.id);
            res.status(statusCodesEnum.OK).send('DESTROYED CARS');
        } catch (e) {
            res.json(e.message)
        }

    }
}
