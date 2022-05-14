const nodemailer = require('nodemailer')

function enviar(to, subject, text) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'busestarapaca1@gmail.com',
            pass: 'pgarcia22',
        },
    })
    let mailOptions = {
        from: 'urrasinh@gmail.com',
        to,
        subject,
        text,
        html
    }
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) console.log(err)
        if (data) console.log(data)
    })
}
// Exportar la función enviar como un módulo.
module.exports = enviar