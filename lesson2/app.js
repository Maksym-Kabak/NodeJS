const express = require('express');
const app = express();
const expressHandlebars = require('express-handlebars');
const path = require('path');

const userController = require('./controlles/user')

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'views')));

app.set('view engine', '.hbs');
app.engine('.hbs', expressHandlebars({
    defaultLayout: false
}));
app.set('views', path.join(process.cwd(), 'views'));

app.get('/', (req, res) => {
    res.render('main');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/users', userController.usersRender);

app.post('/users', userController.postRegister);

app.post('/login', userController.postLogin);


app.listen(3000, (err) => {
    if (err) console.log(err);

    console.log('Server listening on 5000');
});
