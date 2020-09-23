const mailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path')

const htmlTemplate = require('../email-templates');
const { ROOT_EMAIL_PASS, ROOT_EMAIL, FRONTEND_URL } = require('../configs/config');

const emailTemplates = new EmailTemplates({
    message: null,
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: ROOT_EMAIL,
        pass: ROOT_EMAIL_PASS
    }
});

class EmailService {
    async sendMail(userMail, action, context) {
        try {
            const templateInfo = htmlTemplate[action];
            const html = await emailTemplates.render(templateInfo.templateFileName, {
                ...context,
                frontendUrl: FRONTEND_URL
            })

            const mailOptions = {
                from: 'NO REPLY CAR SHOP',
                to: userMail,
                subject: templateInfo.subject,
                html,
            }

            return transporter.sendMail(mailOptions);
        } catch (e) {
            console.log(e);
        }

    }
}

module.exports = new EmailService();
