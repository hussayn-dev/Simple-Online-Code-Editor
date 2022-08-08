const nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "8eba0903b67485",
    pass: "ca84a94f63cde9"
  }
});


class SendMail {
    constructor(email, subject, text= '', html) {
        this.email = email
        this.subject = subject,
        this.text = text
        this.html = html
    }
    async mail () {
        const  info =   await transporter.sendMail({from : "hussayndev3@gmail.com", to : this.email, subject : this.subject,text : this.text, html : this.html
    })
    console.log(info)
    return info
    }
}

module.exports = SendMail