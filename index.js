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
            enviar(correos.split(','), asunto, contenido)
            res.end('enviado')
        }
    })
    .listen(3000)