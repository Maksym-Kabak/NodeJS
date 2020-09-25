const { emailsServices, carsServices } = require('../services');
const { statusCodesEnum } = require('../error');
const { DELETE_CAR, CREATE_CAR } = require('../configs/email-action.enum');

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

            await emailsServices.sendMail(user.email, CREATE_CAR, {
                userName: user.email,
                carModel: car.producer
            })

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

    deleteCar: async (req, res, next) => {
        try {
            const { car, user } = req;

            await carsServices.carDelete(req.params.id);

            await emailsServices.sendMail(user.email, DELETE_CAR, {
                userName: user.email,
                carModel: car.model
            });

            res.status(statusCodesEnum.OK).send('DESTROYED CARS');
        } catch (e) {
            next(e.message)
        }

    }
}
