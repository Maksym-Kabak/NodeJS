const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars')

const app = express();

const users = [];


app.engine('.hbs', expressHbs({defaultLayout: 'main-layout', extname: '.hbs'}))
app.set('view engine', '.hbs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.render('index', {pageTitle: 'Add User'});
});

app.get('/users', (req, res) => {
    res.render('users', {pageTitle: 'Users', users: users, hasUsers: users.length > 0,});
    console.log(users)
});
const newUser = []
app.get('/login', (req, res) => {
    res.render('login', {users: newUser.splice(0), hasUsers: users.length > 0})
});
app.post('/logged', (req, res) => {
    const result = users.find(value => value.email === req.body.email);
    newUser.push(result)
    if (result === undefined) {
        res.redirect('/')
    } else {
        res.redirect('/login')
    }

})
app.post('/users', (req, res) => {
    const result = users.find(value => value.email === req.body.email);
    if (result === undefined) {
        users.push({name: req.body.username, email: req.body.email, password: req.body.password})
        res.redirect('/login');
    } else {
        res.redirect('/');
    }
});
app.listen(3000);
