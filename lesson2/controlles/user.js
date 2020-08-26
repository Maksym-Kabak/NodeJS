const User = require('../models/userModel');


exports.postRegister = (req, res) => {
    const usersArr = new User(req.body.username, req.body.email , req.body.password)
    User.fetchAll(users => {
        if (users.some(user => user.username === req.body.username)) {
            res.render('register', {isLogin: true});
        } else {
            usersArr.save();
            res.render('users', {user: req.body, users});
        }
    })

}
exports.postLogin =  (req, res) => {
    User.fetchAll(users => {
        if (users.some(user => user.username === req.body.username && user.password === req.body.password)) {
            res.render('login', {isRegistered: true, user: req.body});
        } else {
            res.render('login', {notRegister: true, user: req.body});
        }
    })

}

exports.usersRender =  (req, res) => {
    User.fetchAll(users => {
        res.render('users', {users});
    })

}
