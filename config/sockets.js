var mailer = require('nodemailer')
  , env    = process.env.NODE_ENV || 'development'
  , config

try {
  config = require('./config-priv')[env]
}
catch (e) {
  config = require('./config')[env]
}

var mgval  = require('mailgun-validator')(config.mailgunPubKey)
var transport = mailer.createTransport('SMTP', config.mailTransport)

var methods = [
    'getSupport'
  , 'getQuote'
  , 'contactUs'
]

module.exports = exports = SOCK

function SOCK(app, io) {
  this.io = io
  this.app = app
  this.log = app.log
  var self = this
  io.sockets.on('connection', function(socket) {
    methods.forEach(function(method) {
      socket.on(method, function(data) {
        return self[method](data, socket)
      })
    })
  })
}

SOCK.prototype.getSupport = function(data, socket) {
  var self = this
    , name = data.name
    , phone = data.phone || ''
    , email = data.email || 'support@curapps.com'
    , desc = data.desc || ''
    , msg = {};
  mgval.validate(data.email, function(err, res) {
    if (res && !res.is_valid) {
      return socket.emit('getSupportError', 'Invalid email')
    }
    if (err) self.log.error('support', 'Error validating email: ', err)
    msg.from = email
    msg.to = 'evan@curapps.com'
    msg.subject = 'Curapps Web Support Request'
    msg.html = [
      '<html>',
      '<head>',
      '<link rel="stylesheet" href="http://curapps.com/bootstrap/assets/css/bootstrap.css">',
      '<link rel="stylesheet" href="http://curapps.com/bootstrap/assets/css/bootstrap-responsive.css">',
      '</head>',
      '<body>',
      '<div class="container">',
      '<h3>Curapps Support',
      '<img style="float: left;" src="http://curapps.com/bootstrap/assets/img/favicon@2x.png"></h3>',
      '<p>Hello Evan,</p>',
      '<p>You have received a support request from '+name+'</p>',
      '<hr>',
      '<p>'+desc+'</p>',
      '<p>He/she can be contacted at '+phone+' or '+email+'</p>',
      '</div>',
      '</body>',
      '</html>'
    ].join("\n")
    transport.sendMail(msg, function(err) {
      if (err) {
        self.log.error('support', 'Error sending support request', err)
        socket.emit('getSupportError', 'There was an error sending your support request')
      } else {
        socket.emit('getSupportSuccess', 'Successfully submitted support request')
      }
    })
  })
}

SOCK.prototype.getQuote = function(data, socket) {
  var self = this
    , name = data.name
    , phone = data.phone || ''
    , email = data.email || 'support@curapps.com'
    , desc = data.desc || ''
    , quotetype = data.quotetype || 'No quote type given'
    , msg = {};
  mgval.validate(data.email, function(err, res) {
    if (res && !res.is_valid) {
      return socket.emit('getQuoteError', 'Invalid email')
    }
    if (err) self.log.error('quote', 'Error validating email: ', err)
    msg.from = email
    msg.to = 'evan@curapps.com'
    msg.subject = 'Curapps Web Quote Request'
    msg.html = [
      '<html>',
      '<head>',
      '<link rel="stylesheet" href="http://curapps.com/bootstrap/assets/css/bootstrap.css">',
      '<link rel="stylesheet" href="http://curapps.com/bootstrap/assets/css/bootstrap-responsive.css">',
      '</head>',
      '<body>',
      '<div class="container">',
      '<h3>Curapps Qupte',
      '<img style="float: left;" src="http://curapps.com/bootstrap/assets/img/favicon@2x.png"></h3>',
      '<p>Hello Evan,</p>',
      '<p>You have received a quote request from '+name+'</p>',
      '<hr>',
      '<p>Regarding: '+quotetype+'</p>',
      '<p>'+desc+'</p>',
      '<p>He/she can be contacted at '+phone+' or '+email+'</p>',
      '</div>',
      '</body>',
      '</html>'
    ].join("\n")
    transport.sendMail(msg, function(err) {
      if (err) {
        self.log.error('quote', 'Error sending quote request')
        socket.emit('getQuoteError', 'There was an error sending your quote request')
      } else {
        socket.emit('getQuoteSuccess', 'Successfully submitted quote request')
      }
    })
  })
}

SOCK.prototype.contactUs = function(data, socket) {
  var self = this
    , name = data.name
    , phone = data.phone || ''
    , email = data.email || 'support@curapps.com'
    , desc = data.desc || ''
    , msg = {};
  mgval.validate(data.email, function(err, res) {
    if (res && !res.is_valid) {
      return socket.emit('contactUsError', 'Invalid email')
    }
    if (err) self.log.error('contact', 'Error validating email: ', err)
    msg.from = email
    msg.to = 'evan@curapps.com'
    msg.subject = 'Curapps Web Contact Request'
    msg.html = [
      '<html>',
      '<head>',
      '<link rel="stylesheet" href="http://curapps.com/bootstrap/assets/css/bootstrap.css">',
      '<link rel="stylesheet" href="http://curapps.com/bootstrap/assets/css/bootstrap-responsive.css">',
      '</head>',
      '<body>',
      '<div class="container">',
      '<h3>Curapps Contact',
      '<img style="float: left;" src="http://curapps.com/bootstrap/assets/img/favicon@2x.png"></h3>',
      '<p>Hello Evan,</p>',
      '<p>You have received a support request from '+name+'</p>',
      '<hr>',
      '<p>'+desc+'</p>',
      '<p>He/she can be contacted at '+phone+' or '+email+'</p>',
      '</div>',
      '</body>',
      '</html>'
    ].join("\n")
    transport.sendMail(msg, function(err) {
      if (err) {
        self.log.error('contact', 'Error sending support request', err)
        socket.emit('contactUsError', 'There was an error sending your contact request')
      } else {
        socket.emit('contactUsSuccess', 'Successfully submitted contact request')
      }
    })
  })
}