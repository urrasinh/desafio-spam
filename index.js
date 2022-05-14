const url = require('url')
const http = require('http')
const fs = require('fs')
const enviar = require('./mailer')
const llamadoApi = require('./llamadoApi')

http
    .createServer(async (req, res) => {

        if (req.url == '/') {
            res.setHeader('content-type', 'text/html')
            fs.readFile('index.html', 'utf8', (err, data) => {
                res.end(data)
            })
        }
        if (req.url.startsWith('/mailing')) {
            let { correos, asunto, contenido } = url.parse(req.url, true).query
            const dataIndicador = await llamadoApi()
            console.log(dataIndicador)
            const contenidoConIndicadores = contenido + `
            El valor del Dolar del día de hoy es ${dataIndicador.data.dolar.valor} <br>
            El valor del Euro del día de hoy es ${dataIndicador.data.euro.valor} <br>
            El valor del Uf del día de hoy es ${dataIndicador.data.uf.valor} <br>
            El valor del Utm del día de hoy es ${dataIndicador.data.utm.valor} <br>`
            enviar(correos.split(','), asunto, contenido, contenidoConIndicadores)
            res.end('enviado')
        }
    })
    .listen(3000)