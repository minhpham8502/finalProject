const nodeMailer = require('nodemailer')
const adminEmail = 'minhpham852000@gmail.com'
const adminPassword = 'Quangminh2000'

const mailHost = 'smtp.gmail.com'

const mailPort = 587
const sendMail = (to, subject, htmlContent) => {
 
  const transporter = nodeMailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: false, 
    auth: {
      user: adminEmail,
      pass: adminPassword
    }
  })
  const options = {
    from: adminEmail,
    to: to, 
    subject: subject, 
    html: htmlContent 
  }

  return transporter.sendMail(options)
}
module.exports = {
  sendMail: sendMail
}