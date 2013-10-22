var WEB = exports

WEB.sites = {
  rec: {
    name: 'The Real Estate Center',
    url: '/web/rec',
    img: '/img/RECWebsite.png'
  },
  plaidrhino: {
    name: 'The Plaid Rhino',
    url: '/web/plaidrhino',
    img: '/img/PlaidRhinoWebsite.png'
  }
};

WEB.renderIndex = function(req, res) {
  var slugs = Object.keys(WEB.sites)
    , sites = []
  slugs.forEach(function(slug) {
    var site = WEB.sites[slug]
    sites.push(site)
  })
  
  res.render('web', {
    sites: sites
  })
}

WEB.renderBySlug = function(req, res) {
  var slug = req.param('webSite')
  if (!slug || !WEB.sites[slug]) {
    return res.render('errors/404')
  }
  
  var site = WEB.sites[slug]
  res.render('single_web', {
    site: site
  })
}