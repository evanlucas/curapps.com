var path = require('path')
  , root = path.normalize(__dirname+'/..')

module.exports = {
  development: {
    root: root,
    posts_path: path.join(root, 'posts'),
    posts_config_path: path.join(root, 'posts.json'),
    port: 4000,
    mailgunPubKey: '',
    newrelic: '',
    mailTransport: {
      service: 'Mailgun',
      auth: {
        user: '',
        pass: ''
      }
    },
    hostname: 'test.curapps.com',
    nodefly: '',
    emails: ['evan@curapps.com'],
    db: 'mongodb://localhost/curapps_data',
    app: {
      name: 'Curapps',
      pages: [
        {
          title: 'apps',
          href: '/apps',
          icon: 'icon-mobile-phone',
          meta: {
            description: 'Located in Hattiesburg, MS, we specialize in custom iOS applications crafted specifically to fit your needs.',
            keywords: 'iOS, software, development, App Store'
          }
        },
        {
          title: 'web',
          href: '/web',
          icon: 'icon-globe',
          meta: {
            description: 'We provide custom development for web services and websites. We use the latest technologies to make sure that your site/service runs at the most efficient level possible.',
            keywords: 'web, APIs, development, node, node.js'
          }
        },
        {
          title: 'support',
          href: '/support',
          icon: 'icon-envelope',
          meta: {
            description: 'Curapps support is here to make your life easier',
            keywords: 'support, ios, web, development,'
          }
        },
        {
          title: 'blog',
          href: '/blog',
          icon: 'icon-comments-alt',
          meta: {
            description: 'Blog regarding software and web development',
            keywords: 'blog, web, software, development'
          }
        }
      ]
    }
  },
  test: {
    root: root,
    posts_path: path.join(root, 'posts'),
    posts_config_path: path.join(root, 'posts.json'),
    port: 4000,
    mailgunPubKey: '',
    newrelic: '',
    mailTransport: {
      service: 'Mailgun',
      auth: {
        user: '',
        pass: ''
      }
    },
    hostname: 'curapps.com',
    nodefly: '',
    emails: ['evan@curapps.com'],
    db: 'mongodb://localhost/curapps_data',
    app: {
      name: 'Curapps',
      pages: [
        {
          title: 'apps',
          href: '/apps',
          icon: 'icon-mobile-phone',
          meta: {
            description: 'Located in Hattiesburg, MS, we specialize in custom iOS applications crafted specifically to fit your needs.',
            keywords: 'iOS, software, development, App Store'
          }
        },
        {
          title: 'web',
          href: '/web',
          icon: 'icon-globe',
          meta: {
            description: 'We provide custom development for web services and websites. We use the latest technologies to make sure that your site/service runs at the most efficient level possible.',
            keywords: 'web, APIs, development, node, node.js'
          }
        },
        {
          title: 'support',
          href: '/support',
          icon: 'icon-envelope',
          meta: {
            description: 'Curapps support is here to make your life easier',
            keywords: 'support, ios, web, development'
          }
        },
        {
          title: 'blog',
          href: '/blog',
          icon: 'icon-comments-alt',
          meta: {
            description: 'Blog regarding software and web development',
            keywords: 'blog, web, software, development'
          }
        }
      ]
    }
  },
  production: {
    root: root,
    posts_path: path.join(root, 'posts'),
    posts_config_path: path.join(root, 'posts.json'),
    port: 4000,
    mailgunPubKey: '',
    newrelic: '',
    mailTransport: {
      service: 'Mailgun',
      auth: {
        user: '',
        pass: ''
      }
    },
    hostname: 'curapps.com',
    nodefly: '',
    emails: ['evan@curapps.com'],
    db: 'mongodb://localhost/curapps_data',
    app: {
      name: 'Curapps',
      pages: [
        {
          title: 'apps',
          href: '/apps',
          icon: 'icon-mobile-phone',
          meta: {
            description: 'Located in Hattiesburg, MS, we specialize in custom iOS applications crafted specifically to fit your needs.',
            keywords: 'iOS, software, development, App Store'
          }
        },
        {
          title: 'web',
          href: '/web',
          icon: 'icon-globe',
          meta: {
            description: 'We provide custom development for web services and websites. We use the latest technologies to make sure that your site/service runs at the most efficient level possible.',
            keywords: 'web, APIs, development, node, node.js'
          }
        },
        {
          title: 'support',
          href: '/support',
          icon: 'icon-envelope',
          meta: {
            description: 'Curapps support is here to make your life easier',
            keywords: 'support, ios, web, development'
          }
        },
        {
          title: 'blog',
          href: '/blog',
          icon: 'icon-comments-alt',
          meta: {
            description: 'Blog regarding software and web development',
            keywords: 'blog, web, software, development'
          }
        }
      ]
    }
  }
}
