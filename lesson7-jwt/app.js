const express = require('express');

const apiRouter = require('./routes/api.router');

const app = express();
app.use(express.json());

const instance = require('./dateBase').getInstance();
instance.setModels()


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


