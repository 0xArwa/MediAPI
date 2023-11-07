const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: "587",
    secure: false,
    auth: {
        user: 'insight-services-testing@outlook.com',
        pass: 'cdre1932CD'
    }
});
module.exports = {
    sendOTP: async (email)=>{
        const random_numbers = Math.floor(1000 + Math.random() * 9000);
        const options = {
            from: 'insight-services-testing@outlook.com',
            to: email,
            subject: 'Verification code',
            text: `The code is ${random_numbers}`
        }
        await transporter.sendMail(options)
        return random_numbers
    }
};
