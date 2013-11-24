var mongoose = require('mongoose')
  , Request  = mongoose.model('Request')
  , Path     = require('path')

exports.record = function(req, res, next) {
  var exts = ['.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.html']
  var path = req.path
  if (~exts.indexOf(Path.extname(path))) {
    return next()
  } else {
    var r = new Request({
      url: path,
      method: req.method,
      referrer: req.headers.referer || req.headers.referrer || '',
      useragent: req.headers['user-agent'] || "",
      ip: req.ip
    })

    r.save(function(err) {
      if (err) {
        console.log('reports', 'Error saving page request', err)
        return next()
      } else {
        return next()
      }
    })
  }
}