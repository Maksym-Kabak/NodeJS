const cars = [
    {id: 1, producer:"subaru",order: 1,model: "wrx",year: 2010, color:"blue",type: "sedan",engine: "ej204x",price: 2,power: 400},
    {id: 2, producer:"subaru",order: 2,model: "legacy",year: 2007, color:"silver",type: "sedan",engine: "ez30",price: 3,power: 250},
    {id: 3, producer:"subaru",order: 3,model: "tribeca",year: 2011, color:"white",type: "jeep",engine: "ej20",price: 2,power: 300},
    {id: 4, producer:"subaru",order: 4,model: "leone",year: 1998, color:"yellow",type: "sedan",engine: "ez20x",price: 2,power: 140},
    {id: 5, producer:"subaru",order: 5,model: "impreza",year: 2014, color:"red",type: "sedan",engine: "ej204x",price: 2,power: 200},
];

module.exports = {

    fetchAllCars: () => cars,

    fetchCarId: (data) =>  cars.find(item => {
        return item.id === parseInt(data);
    }),

    createCars: (data) => {
        let carsId = cars.map(value => value.id);
        let orderCars = cars.map(value => value.id);

        let newId = carsId.length > 0 ? Math.max.apply(Math, carsId) + 1 : 1;

        let newOrder = orderCars.length > 0 ? Math.max.apply(Math, orderCars) + 1 : 1;


        let newCars = {
            id: newId,
            producer: data.producer,
            order: newOrder,
            model: data.model,
            year: data.year,
            color: data.color,
            engine: data.engine,
            price: data.price,
            type: data.type
        }
        cars.push(newCars);
    },

    carUpdate: (id, data) => {
        let found = cars.find(value => value.id === parseInt(id));
        if(found) {
            const updateCar = {
                id: found.id,
                producer: data.producer,
                order: data.order,
                model: data.model,
                year: data.year,
                color: data.color,
                engine: data.engine,
                price: data.price,
                type: data.type
            }
            let targetIndex = cars.indexOf(found);

            cars.splice(targetIndex, 1, updateCar);
        }

    },

    carDelete: (id) => {
        let found = cars.find( value => value.id === parseInt(id));
        if (found){
            let targetIndex = cars.indexOf(found);
            cars.splice(targetIndex, 1);
        }
    }

}
