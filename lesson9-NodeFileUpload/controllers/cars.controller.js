const { emailsServices, carsServices } = require('../services');
const { statusCodesEnum } = require('../error');
const { DELETE_CAR, CREATE_CAR } = require('../configs/email-action.enum');
const { transactionInstance } = require('../dateBase').getInstance();

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
        const transaction = await transactionInstance();
        try {
            const { body, user } = req;
            const car = await carsServices.createCars({ ...body, user_id: user.id }, transaction);

            await emailsServices.sendMail(user.email, CREATE_CAR, {
                userName: user.email,
                carModel: car.producer
            })

            await transaction.commit()
            res.status(statusCodesEnum.CREATED).json(car);
        } catch (e) {
            await transaction.rollback()
            res.json(e.message)
        }
    },

    updateCar: async (req, res) => {
        const transaction = await transactionInstance();
        try {
            const car = await carsServices.carUpdate(req.params.id, req.body, transaction);

            await transaction.commit();
            res.status(statusCodesEnum.OK).json(car);
        } catch (e) {
            await transaction.rollback()
            res.json(e.message)
        }

    },

    deleteCar: async (req, res, next) => {
        const transaction = await transactionInstance();
        try {
            const { car, user } = req;

            await carsServices.carDelete(req.params.id, transaction);

            await emailsServices.sendMail(user.email, DELETE_CAR, {
                userName: user.email,
                carModel: car.model
            });

            await transaction.commit();
            res.status(statusCodesEnum.OK).send('DESTROYED CARS');
        } catch (e) {
            await transaction.rollback();
            next(e.message)
        }

    }
}
