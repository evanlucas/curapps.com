var sm = require('sitemap')

module.exports = function(app) {
  var urls = []
    , config = app.config
    , pages = config.app.pages

  app.get('/', function(req, res) {
    res.render('index', {
      pages: pages
    })
  })

  var getMetadata = function(meta) {
    return function(req, res, next) {
      res.locals.meta = meta
      next()
    }
  }

  var apps = require('../controllers/apps')
    , posts = require('../controllers/posts')
    , web = require('../controllers/web')

  pages.forEach(function(page, index) {
    var pageName = page.title
      , meta = page.meta
    urls.push({ url: page.href })
    if (pageName == 'apps') {
      app.get(page.href, getMetadata(meta), apps.render)
    } else if (pageName == 'blog') {
      app.get(page.href, getMetadata(meta), posts.renderIndex)
    } else if (pageName == 'web') {
      app.get(page.href, getMetadata(meta), web.renderIndex)
    } else {
      app.get(page.href, getMetadata(meta), function(req, res) {
        res.render(pageName, {
          page: pageName
        })
      })
    }
  })
  urls.push({url: '/quote'})
  app.get('/quote', function(req, res) {
    return res.render('quote')
  })

  urls.push({url: '/contact'})
  app.get('/contact', function(req, res) {
    return res.render('contact')
  })

  app.get('/apps/:appName', apps.renderByName)
  Object.keys(apps.apps).forEach(function(key) {
    var a = apps.apps[key]
    urls.push({ url: a.url })
  })

  var cats = []

  Object.keys(posts.posts).forEach(function(key) {
    urls.push({ url: '/blog/posts/'+key })
    var p = posts.posts[key]
    var postCats = p.categories
    postCats.forEach(function(cat) {
      if (cats.indexOf(cat) === -1) {
        cats.push(cat)
      }
    })
  })

  cats.forEach(function(cat) {
    urls.push({url: '/blog/categories/'+cat})
  })

  app.get('/blog/categories/:category', posts.renderCategory)

  app.get('/blog/posts/:id', posts.renderByIndex)

  Object.keys(web.sites).forEach(function(key) {
    var a = web.sites[key]
    urls.push({ url: a.url })
  })

  app.get('/web/:webSite', web.renderBySlug)

  var sitemap = sm.createSitemap({
    hostname: 'http://curapps.com',
    cacheTime: 600000,
    urls: urls
  })

  app.get('/sitemap.xml', function(req, res){
    sitemap.toXML(function(xml) {
      res.header('Content-Type', 'application/xml')
      res.send(xml)
    })
  })
}