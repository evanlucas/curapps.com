var env           = process.env.NODE_ENV || 'development'
  , fs            = require('fs')
  , processNumber = process.env.INDEX_OF_PROCESS || 0
  , color         = require('colors')
  , config

var log = require('npmlog')
log.heading = 'curapps'


console.log = log.info.bind(log)
console.error = log.error.bind(log)
console.info = log.verbose.bind(log)
console.warn = log.warn.bind(log)

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

var express  = require('express')
  , fs       = require('fs')
  , mongoose = require('mongoose')
  , moment   = require('moment')

mongoose.connect(config.db)
require('./models/request')
if (!fs.existsSync(config.posts_path)) {
  log.info('mkdir', 'Creating posts path...')
  fs.mkdirSync(config.posts_path)
}
var app = express()
  , server = require('http').createServer(app)

app.log = log
app.config = config

require('./config/express')(app)
require('./config/router')(app)
var io = require('socket.io').listen(server)

if (env === 'production') {
  io.set('log level', 1)
}

var port = config.port
server.listen(port)
new (require('./config/sockets'))(app, io)
var date = moment().format('MMM Do, YYYY [at] hh:mm:ss A')
log.info('listen', port.toString(), date.cyan)

if (require.main === module) {
  exports = module.exports = app
}
