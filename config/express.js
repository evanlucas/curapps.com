var express      = require('express')
  , viewHelpers  = require('./middleware/view')
  , secret       = '8ea2e76a037a7dba6e6246055fd50134'
  , RedisStore   = require('connect-redis')(express)
  , redis        = require('redis').createClient()
  , cookieParser = express.cookieParser(secret)
  , sessionStore = new RedisStore({ client: redis })
  , env          = process.env.NODE_ENV || 'development'

module.exports = function(app) {

  var config = app.config

  app.set('showStackError', true)

  app.use(express.compress({
    filter: function(req, res) {
      return /json|text|javascript|css/.test(res.getHeader('Content-Type'))
    },
    level: 9
  }))

  app.use(express.static(config.root+'/public'))
  app.use(express.static(config.root+'/bower_components'))
  app.enable('trust proxy')
  if (env === 'development') {
    app.use(express.logger('dev'))
  }

  app.set('views', config.root+'/views')
  app.set('view engine', 'jade')
  app.set('view options', {doctype: 'html', pretty: false})
  app.configure(function() {
    app.use(express.favicon(config.root+'/public/img/favicon.ico'))
    app.use(viewHelpers(config))
    app.use(express.cookieParser())
    app.use(express.methodOverride())
    app.use(express.session({
        secret: secret
      , maxAge: new Date(Date.now()+28800000)
      , store: sessionStore
    }))

    var reports = require(config.root+'/controllers/reports')
    app.use(reports.record)

    app.use(app.router)

    app.use(function(err, req, res, next) {
      if (~err.message.indexOf('not found')) return next()

      app.log.error('500', err.stack)

      res.status(500).render('errors/500', { error: err.stack })
    })

    app.use(function(req, res, next) {
      res.status(404).render('errors/404', { url: req.originalUrl })
    })
  })
}