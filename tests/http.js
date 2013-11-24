var request = require('supertest')
  , env     = process.env.NODE_ENV = 'test'
  , server  = require('../server.js')
  , fs      = require('fs')
  , path    = require('path')
  , config

try {
  config = require('../config/config-priv')[env]
}
catch(e) {
  config = require('../config/config')[env]
}

request = request('http://localhost:'+config.port)

var routes = [
    '/'
  , '/apps'
  , '/web'
  , '/support'
  , '/blog'
  , '/quote'
  , '/contact'
  , '/apps/mailstrap'
  , '/apps/watertracker'
  , '/apps/iconbounce'
  , '/apps/doubledock'
  , '/apps/rec'
  , '/blog/posts/1'
  , '/blog/posts/2'
  , '/blog/posts/3'
  , '/blog/categories/PHP'
  , '/blog/categories/Cloud'
  , '/blog/categories/Node.js'
  , '/blog/categories/launchctl'
  , '/web/rec'
  , '/web/plaidrhino'
  , '/web/mostlymacies'
  , '/sitemap.xml'
]

describe('curapps http server', function() {
  describe('routes', function() {
    routes.forEach(function(route) {
      describe('GET '+route, function() {
        it('Should return 200', function(done) {
          request.get(route).expect(200, done)
        })
      })
      
      describe('POST '+route, function() {
        it('Should return 404', function(done) {
          request.post(route).expect(404, done)
        })
      })
      
      describe('PUT '+route, function() {
        it('Should return 404', function(done) {
          request.put(route).expect(404, done)
        })
      })
      
      describe('DELETE '+route, function() {
        it('Should return 404', function(done) {
          request.del(route).expect(404, done)
        })
      })
    })
  })
  
  describe('assets', function() {
    describe('Images', function() {
      fs.readdirSync(path.join(__dirname, '../public/img'))
        .filter(function(file) {
          return /png|svg|ico/.test(path.extname(file))
        })
        .forEach(function(file) {
          describe('GET /img/'+file, function() {
            it('Should return 200', function(done) {
              request.get('/img/'+file).expect(200, done)
            })
          })
        })
    })
    
    describe('stylesheets', function() {
      fs.readdirSync(path.join(__dirname, '../public/css'))
        .filter(function(file) {
          return path.extname(file) === '.css'
        })
        .forEach(function(file) {
          describe('GET /css/'+file, function() {
            it('Should return 200', function(done) {
              request.get('/css/'+file).expect(200, done)
            })
          })
        })
    })
    
    describe('client side js', function() {
      fs.readdirSync(path.join(__dirname, '../public/js'))
        .filter(function(file) {
          return path.extname(file) === '.js'
        })
        .forEach(function(file) {
          describe('GET /js/'+file, function() {
            it('Should return 200', function(done) {
              request.get('/js/'+file).expect(200, done)
            })
          })
        })
      
      if (fs.existsSync(path.join(__dirname, '../public/js/min'))) {
        fs.readdirSync(path.join(__dirname, '../public/js/min'))
          .filter(function(file) {
            return path.extname(file) === '.js'
          })
          .forEach(function(file) {
            describe('GET /js/min/'+file, function() {
              it('Should return 200', function(done) {
                request.get('/js/min/'+file).expect(200, done)
              })
            })
          })
      }
    })
  })
})