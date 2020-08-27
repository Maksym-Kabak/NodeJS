const express = require('express');

const carRouter = require('./routes/cars')

const app = express();
app.use(express.json());

app.use('/cars', carRouter);

app.use('/', (req, res) => {
    res.send('all works')
});

app.listen(3000, (err) => {
    if (err) console.log(err);
    console.log('Server  3000');
});
