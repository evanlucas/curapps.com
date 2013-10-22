var env    = process.env.NODE_ENV || 'development'
  , config

try {
  config = require('../config/config-priv')[env]
}

catch (e) {
  config = require('../config/config')[env]
}

APPS = exports

APPS.apps = {
  mailstrap: {
    name: 'Mailstrap',
    img: '/img/MailstrapPromoImages.png',
    largeimg: '/img/Mailstrap250x250.png',
    desc: 'Mailstrap makes administering email even easier. Built around Mailgun’s rich set of APIs, Mailstrap allows you to manage your account directly from your iPhone, iPad, or iPod. Whether you want to just check the status of a mailbox, or create a full-blown mailing lists, Mailstrap is here to make things easier. Mailstrap allows manipulation of the following endpoints: <ul><li>Domains</li><li>Mailboxes</li><li>Mailing Lists</li><li>Routes</li><li>Logs</li><li>Campaigns</li><li>Bounces</li><li>Complaints</li><li>Unsubscribes</li></ul> Mailgun helps take the headache out of email. It gets easier every day. Please note that this app requires an account with Mailgun. It works with both free and paid accounts. ',
    supported: 'iOS 5.0 and up',
    storeType: 'appstore',
    storeUrl: 'http://itunes.com/apps/Mailstrap',
    url: '/apps/mailstrap',
    meta: {
      description: 'Mailstrap, a Mailgun client for iOS',
      keywords: 'Mailstrap, mailgun, ios, curapps'
    }
  },
  watertracker: {
    name: 'WaterTracker',
    img: '/img/watertracker.png',
    largeimg: '/img/WaterTracker250x250.png',
    desc: 'Delta Farm WaterTracker was developed to help producers quantify and manage their irrigation usage.. The app features geo-referenced mapping of wells, a simple start/stop function on watering events, calculations and conversions for the most commonly used units of measurements and an easy to use export feature that will allow the producer to compile a spreadsheet with irrigation events for their own personal records. The app is simple to navigate, set up, and utilize and will be a valuable tool for irrigation management.',
    supported: 'iOS 6.0 and up',
    storeType: 'appstore',
    storeUrl: 'http://itunes.com/apps/DeltaFarmWaterTracker',
    url: '/apps/watertracker',
    meta: {
      description: 'WaterTracker, a simplified way to manage irrigation usage for iOS',
      keywords: 'WaterTracker, Delta F.A.R.M., ios, curapps'
    }
  },
  iconbounce: {
    name: 'IconBounce',
    img: '/img/iconbounce.png',
    largeimg: '/img/Iconbounce250x250.png',
    desc: 'IconBounce is a tweak that makes your dock icons bounce, flip, and rotate randomly.  The animations include rotating clockwise and counterclockwise, flipping vertically and horizontally, as well as flipping and rotating at the same time.',
    supported: 'iOS 5.0 and up',
    storeType: 'cydia',
    storeUrl: 'cydia://package/com.ia.iconbounce',
    url: '/apps/iconbounce',
    meta: {
      description: 'Iconbounce is a Mobile Substrate tweak for iOS that makes your icons rotate, flip, and bounce',
      keywords: 'Iconbounce, cydia, ios, curapps'
    }
  },
  doubledock: {
    name: 'DoubleDock',
    img: '/img/doubledock.png',
    largeimg: '/img/DoubleDock250x250.png',
    desc: 'DoubleDock gives you the option of having two rows in the dock of your iPhone/iPod.  It provides multiple settings that allow for either one or two rows and gives you the option of having three, four, or five columns of icons in your dock.',
    supported: 'iOS 5.0 and up',
    storeType: 'cydia',
    storeUrl: 'cydia://package/org.thebigboss.doubledock',
    url: '/apps/doubledock',
    meta: {
      description: 'DoubleDock is a Mobile Substrate tweak for iOS that gives your dock two rows.',
      keywords: 'DoubleDock, cydia, ios, curapps'
    }
  },
  rec: {
    name: 'The Real Estate Center',
    img: '/img/rec_promo_images.png',
    largeimg: '/img/Rec250x250.png',
    desc: 'The Real Estate Center application is a custom application created to present featured listings of a local Realtor.  It allows one to view images, request more information, and contact the company directly.  Now available on the App Store!',
    supported: 'iOS 5.1 and up',
    storeType: 'appstore',
    storeUrl: 'http://itunes.com/apps/TheRealEstateCenter',
    url: '/apps/rec',
    meta: {
      description: 'The Real Estate Center is an iOS application promoting featured listings for a local Hattiesburg, MS Realtor.',
      keywords: 'The Real Estate Center, ios, curapps'
    }
  }
};

APPS.render = function(req, res) {
  var keys = Object.keys(APPS.apps)
  var apps = []
  keys.forEach(function(key) {
    var app = APPS.apps[key]
    apps.push(app)
  })
  return res.render('apps', {
    apps: apps,
    pages: config.app.pages
  })
}

APPS.renderByName = function(req, res) {
  if (!req.param('appName')) {
    return res.render('errors/404')
  }
  var appName = req.param('appName')

  if (!APPS.apps.hasOwnProperty(appName)) {
    return res.render('errors/404')
  }

  var app = APPS.apps[appName]
  return res.render('single_app', {
    app: app,
    pages: config.app.pages
  })
}