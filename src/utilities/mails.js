const SendMail = require('./sendmail')
const sendVerificationEmail  = async(name, email, token, origin) => {
    const verifyEmail = `${origin}/user/verify-email?token=${token}&email=${email}`;
    
    const message = `<p>Please confirm your email by clicking on the following link : 
    <a href="${verifyEmail}">Verify Email</a> </p>`;
    const sendMail = new SendMail(email, "Email Confirmation", "", `<h4> Hello, ${name}</h4>${message}` )
    return sendMail.mail()
}    
    module.exports = sendVerificationEmail;
    