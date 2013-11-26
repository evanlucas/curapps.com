var fs      = require('fs')
  , env     = process.env.NODE_ENV || 'development'
  , marked  = require('marked')
  , hljs    = require('highlight.js')
  , _       = require('underscore')
  , config

try {
  config = require('../config/config-priv.js')[env]
}

catch (e) {
  config = require('../config/config')[env]
}

var opts = {
  gfm: true,
  highlight: function(code, lang) {
    if (hljs.LANGUAGES[lang]) {
      return hljs.highlight(lang, code).value
    } else {
      return hljs.highlightAuto(code).value
    }
  },
  tables: true,

}

POSTS = exports

POSTS.posts = {
    1: {
      title: 'Access a MSSQL database from PHP with Mountain Lion',
      author: 'Evan Lucas',
      preview: 'After having quite the time setting up a PHP environment on Mountain Lion that would reliably access a SQL Server database, I figured I would post my experience.  I found a couple of blog posts that just wouldn\'t work for me out of the box.  The following post is based mostly on <a href="http://bit.ly/127e2xo">http://bit.ly/127e2xo</a> and <a href="http://bit.ly/127e1tc">http://bit.ly/127e1tc</a> with a few modifications.',
      createdAt: 'Jan 24, 2013',
      filename: 'accessamssqldatabasefromphp.md',
      categories: [
        'PHP'
      ],
      meta: {
        description: 'Compile PHP for MSSQL access on Mountain Lion',
        keywords: 'php, mac, mssql, mountain lion'
      },
      id: 1
    },
    2: {
      title: 'Bitcasa',
      author: 'Evan Lucas',
      preview: 'For the past few months, I have participated in a beta program for cloud storage. The whole infinite storage aspect got me pretty interested and I have to say that I am glad I took part.  Bitcasa has expanded on cloud storage by offering what they call `Infinite Storage`.  It\'s like having an external drive without the external drive.',
      createdAt: 'Feb 18, 2013',
      filename: 'bitcasa.md',
      categories: [
        'Cloud'
      ],
      meta: {
        description: 'Cheap cloud storage and backup',
        keywords: 'bitcasa, cloud, storage'
      },
      id: 2
    },
    3: {
      title: 'Node.js and launchctl',
      author: 'Evan Lucas',
      preview: 'A few months ago, I had to come up with a way to host multiple <a href="http://nodejs.org">node.js</a> applications on a single server.  Having used <a href="https://github.com/punkave/stagecoach">stagecoach</a> on my Ubuntu servers before, I figured that a similar setup would suffice.  I did not quite like the way that stagecoach deployed the apps...',
      createdAt: 'Oct 21, 2013',
      filename: 'nodelaunchctl.md',
      categories: [
        'Node.js',
        'launchctl'
      ],
      meta: {
        description: 'Native bindings to launchctl for node.js',
        keywords: 'launchctl, node.js, nodejs, mac, launchd'
      },
      id: 3
    }
};

POSTS.getCategories = function() {
  var posts = POSTS.posts
    , cats = []

  Object.keys(posts).forEach(function(key) {
    var post = posts[key]
    categories = post.categories
    cats = _.union(cats, categories)
  })

  cats = cats.sort(function(a,b) {
    return a < b ? 1 : a > b ? -1 : 0
  })
  return cats
}

POSTS.renderIndex = function(req, res) {
  var perPage = 5
    , page = req.param('page') > 0 ? req.param('page') : 1
    , posts = []
    , cats = POSTS.getCategories()

  var keys = Object.keys(POSTS.posts)
  keys.forEach(function(key) {
    key = Number(key)
    if (key >= page && key < page*perPage) {
      posts.push(POSTS.posts[key])
    }
  })

  posts.sort(function(a, b) {
    a = new Date(a.createdAt)
    b = new Date(b.createdAt)
    return a > b ? -1 : a < b ? 1 : 0
  })

  res.render('blog', {
    posts: posts,
    index: page,
    pageCount: POSTS.posts.length / perPage,
    cats: cats
  })
}

POSTS.renderByIndex = function(req, res) {
  var currentPost
    , id = req.param('id')
    , allPosts = POSTS.posts

  if (allPosts[id]) {
    currentPost = allPosts[id]
  } else {
    return res.render('errors/404', {
      title: 'Cannot find post'
    })
  }

  if (currentPost) {
    var postPath = config.posts_path+'/'+currentPost.filename
    fs.exists(postPath, function(e) {
      if (!e) {
        return res.render('errors/404', {
          title: 'Cannot find post titled '+currentPost.title
        })
      } else {
        var postContent = fs.readFileSync(postPath, 'utf8')
        marked(postContent, opts, function(err, content) {
          if (err) {
            req.log.error('posts', 'Error converting markdown to html:', err)
            return res.render('errors/500')
          } else {
            res.render('single_post', {
                content: content
              , post: currentPost
              , cats: POSTS.getCategories()
            })
          }
        })
      }
    })
  }
}

POSTS.renderCategory = function(req, res) {
  var cat = req.param('category')
    , allPosts = POSTS.posts
    , posts = []
    , perPage = 5
    , page = req.param('page') > 0 ? req.param('page') : 1
  Object.keys(allPosts).forEach(function(key) {
    var post = allPosts[key]
      , cats = post.categories
    if (cats.indexOf(cat) !== -1) {
      posts.push(post)
    }
  })

  posts.sort(function(a, b) {
    a = new Date(a.createdAt)
    b = new Date(b.createdAt)
    return a > b ? -1 : a < b ? 1 : 0
  })

  var thesePosts = []
  var startIndex = (page-1)*perPage
  var maxIndex = page*perPage
  for (var i=startIndex; i<page*perPage; i++) {
    if (posts.length < maxIndex && i < posts.length) {

      thesePosts.push(posts[i])
    }
  }
  res.render('blog_cats', {
    posts: thesePosts,
    index: page,
    pageCount: posts.length,
    category: cat,
    cats: POSTS.getCategories()
  })
}