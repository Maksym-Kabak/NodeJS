const express = require('express');

const router = express.Router();

const data = [
    {id: 1, producer:"subaru",order: 1,model: "wrx",year: 2010, color:"blue",type: "sedan",engine: "ej204x",price: 2,power: 400},
    {id: 2, producer:"subaru",order: 2,model: "legacy",year: 2007, color:"silver",type: "sedan",engine: "ez30",price: 3,power: 250},
    {id: 3, producer:"subaru",order: 3,model: "tribeca",year: 2011, color:"white",type: "jeep",engine: "ej20",price: 2,power: 300},
    {id: 4, producer:"subaru",order: 4,model: "leone",year: 1998, color:"yellow",type: "sedan",engine: "ez20x",price: 2,power: 140},
    {id: 5, producer:"subaru",order: 5,model: "impreza",year: 2014, color:"red",type: "sedan",engine: "ej204x",price: 2,power: 200},
 ];
// READ
router.get('/', (req, res) => {
    res.status(200).json(data);
});

router.get('/:id', (req, res) => {
    let found = data.find(item => {
        return item.id === parseInt(req.params.id);
    });
    if (found) {
        res.status(200).json(found)
    } else {
        res.sendStatus(404);
    }
});
// CREATE
router.post('/', (req, res) => {
    let carsId = data.map(value => value.id);
    let orderCars = data.map(value => value.id);

    let newId = carsId.length > 0 ? Math.max.apply(Math, carsId) + 1 : 1;

    let newOrder = orderCars.length > 0 ? Math.max.apply(Math, orderCars) + 1 : 1;


    let newCars = {
        id: newId,
        producer: req.body.producer,
        order: newOrder,
        model: req.body.model,
        year: req.body.year,
        color: req.body.color,
        engine: req.body.engine,
        price: req.body.price,
        type: req.body.type
    }
    data.push(newCars);
    res.status(201).json(newCars);
})
// UPDATE
router.put('/:id', (req, res) => {
    let found = data.find(value => value.id === parseInt(req.params.id));
    if (found) {
        let update = {
            id: found.id,
            producer: req.body.producer,
            order: req.body.order,
            model: req.body.model,
            year: req.body.year,
            color: req.body.color,
            engine: req.body.engine,
            price: req.body.price,
            type: req.body.type
        }
        let targetIndex = data.indexOf(found);

        data.splice(targetIndex, 1, update);

        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});
// DELETE

router.delete('/:id', (req, res) => {
    let found = data.find( value => value.id === parseInt(req.params.id));
    if (found){
        let targetIndex = data.indexOf(found);
        data.splice(targetIndex, 1);
    }
    res.sendStatus(204);
});


module.exports = router;


