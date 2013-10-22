var env           = process.env.NODE_ENV || 'development'
  , fs            = require('fs')
  , processNumber = process.env.INDEX_OF_PROCESS || 0
  , winston       = require('winston')
  , color         = require('colors')
  , config

var log = new (winston).Logger({
  transports: [
    new winston.transports.Console({ colorize: true, level: 'info' })
  ]
})

try {
  config = require('./config/config-priv.js')[env]
}

catch (e) {
  config = require('./config/config')[env]
}


log.info('Setting up strong-agent')
require('strong-agent').profile(
    config.nodefly
  , [config.app.name, config.hostname, processNumber]
)

var express = require('express')
  , fs = require('fs')
  , mongoose = require('mongoose')
  , moment = require('moment')

mongoose.connect(config.db)
require('./models/request')
if (!fs.existsSync(config.posts_path)) {
  log.info('Creating posts path...')
  fs.mkdirSync(config.posts_path)
}
var app = express()
  , server = require('http').createServer(app)

app.log = log
app.config = config

require('./config/express')(app)
require('./config/router')(app)
io = require('socket.io').listen(server)
var port = config.port
server.listen(port)
new (require('./config/sockets'))(app, io)
var date = moment().format('MMM Do, YYYY [at] hh:mm:ss A')
log.info('Starting curapps server on port'.grey, port.toString().magenta, date.cyan)

if (require.main === module) {
  exports = module.exports = app
}