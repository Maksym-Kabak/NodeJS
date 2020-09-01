const Cars = require('../models/cars.models');

module.exports = {

    fetchAllCars: (res) => {
        Cars.findAll()
            .then(cars => {
                res.status(200).json(cars)
            }).catch(err => console.log(err));


    },

    fetchCarId: (req, res) => {
        const carId = req.params.id
        Cars.findByPk(carId)
            .then(cars => {
                res.status(200).json(cars)
            })
            .catch(err => console.log(err))
    },

    createCars: (data) => {
        const producer = data.producer;
        const model = data.model;
        const year = data.year;
        const price = data.price;
        Cars
            .create({
                producer: producer,
                model: model,
                year: year,
                price: price
            })
            .then(result => {
                // console.log(result)
                // console.log('Created Car')
            })
            .catch(err => {
                console.log(err)
            })
    },

    carUpdate: (id, data) => {
        const carId = id;
        const updatedProducer = data.producer;
        const updatedModel = data.model;
        const updatedYear = data.year;
        const updatedPrice = data.price;
        Cars.findByPk(carId)
            .then(cars => {
                cars.producer = updatedProducer;
                cars.model = updatedModel;
                cars.year = updatedYear;
                cars.price = updatedPrice;
                return cars.save();
            })
            .then(result => {
                console.log('car updated')
            })
            .catch(err => console.log(err))
    },

    carDelete: (req) =>  {
        const carsId = req.params.id;
        Cars.findByPk(carsId)
            .then(car => {
                    return car.destroy();
                }
            ).then(result => {
            // console.log('DESTROYED CARS ');
        }).catch(err => {
            console.log(err)
        });
    }

}
