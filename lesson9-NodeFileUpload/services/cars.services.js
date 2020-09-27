const connection = require('../dateBase').getInstance();

module.exports = {

    fetchAllCars: async () => {
        const Car = connection.getModel('Car');
        return Car.findAll({})
    },

    fetchCarId: async (paramsId) => {
        const Car = connection.getModel('Car');
        return Car.findByPk(paramsId);
    },

    createCars: async (carObject, transaction) => {
        const Car = connection.getModel('Car');
        return Car.create(carObject, { new: true, transaction });
    },

    carUpdate: async (id, data, transaction) => {
        const Car = connection.getModel('Car');
        return Car.update(data, {
            where: { id },
            transaction
        });
    },

    carDelete: async (id, transaction) => {
        const Car = connection.getModel('Car');
        return Car.destroy({
            where: { id },
            transaction
        })

    }

}
