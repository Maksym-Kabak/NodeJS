const express = require('express');

const carRouter = require('./routes/cars')
const sequelize = require('./dateBase/dataBase')

const app = express();
app.use(express.json());

app.use('/cars', carRouter);

app.use('/', (req, res) => {
    res.send('all works')
});


sequelize
    .sync()
    .then(result => {
        // console.log(result);
        app.listen(3000, (err) => {
            if (err) console.log(err);
            console.log('Server  3000');
        });
    })
    .catch(err => console.log(err));

