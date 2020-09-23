const emailAction = require('../configs/email-action.enum');

module.exports = {
    [emailAction.WELCOME]: {
        subject: '[CAR SHOP] Welcome!',
        templateFileName: 'welcome'
    },
    [emailAction.FORGOT_PASS]: {
        subject: '[CAR SHOP] Forgot Password!',
        templateFileName: 'forgot-pass'
    },
    [emailAction.CREATE_CAR]: {
        subject: '[Car Shop] added car',
        templateFileName: 'create-car'
    }
}
