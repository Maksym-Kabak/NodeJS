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

    createCars: async (carObject) => {
        const Car = connection.getModel('Car');
        return Car.create(carObject, {new: true});
    },

    carUpdate: async (paramsId, data) => {
        const Car = connection.getModel('Car');
        return Car.update(data, {
            where: {id: paramsId}
        });
    },

    carDelete: async (id) => {
        const Car = connection.getModel('Car');
        return Car.destroy({
             where: {id: id}
         })

    }

}
