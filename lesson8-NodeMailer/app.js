const express = require('express');
const dotenv = require('dotenv');
const apiRouter = require('./routes/api.router');
const app = express();

dotenv.config();


const instance = require('./dateBase').getInstance();
instance.setModels()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/api', apiRouter);

app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 404)
        .json({
            message: err.message || 'NOT FOUND',
            code: err.customCode || ''
        })
});


app.listen(3000, (err) => {
    if (err) console.log(err);
    console.log('Server  3000');
});

process.on('unhandledRejection', reason => {


    process.exit(0);
})

