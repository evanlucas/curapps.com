var env           = process.env.NODE_ENV || 'development'
  , fs            = require('fs')
  , color         = require('colors')
  , bunyan        = require('bunyan')
  , config

process.title = 'curapps'

var log = new bunyan.createLogger({
  name: 'curapps'
})


try {
  config = require('./config/config-priv.js')[env]
}

catch (e) {
  config = require('./config/config')[env]
}

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
log.info('listen', port.toString(), date.cyan, env)

if (require.main !== module) {
  exports = module.exports = app
}
