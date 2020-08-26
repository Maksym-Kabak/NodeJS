const fs = require('fs');
const path = require('path');

// const users = [];
const p = path.join(process.cwd(), 'data', 'users.json');

const getUserFromFile = (cb) => {
    fs.readFile(p, (err, data) => {
        if (err) {
            cb([]);
        }else {
            cb(JSON.parse(data));
        }
    })

}
module.exports = class User {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    save() {
        fs.readFile(p, (err, data) => {
            let usersArr = [];
            if (!err) {
                usersArr = JSON.parse(data);
            }
            usersArr.push(this);
            fs.writeFile(p, JSON.stringify(usersArr), (err) => {
                console.log(err);
            });
        });
    }
    static fetchAll(cb) {
        getUserFromFile(cb);
    }
}
