const {DB_NAME, DB_PASSWORD, DB_USER} = require('./config')

module.exports = {
    "development": {
        "username": DB_USER,
        "password": DB_PASSWORD,
        "database": DB_NAME,
        "host": "127.0.0.1",
        "dialect": "mysql"
    }
}
