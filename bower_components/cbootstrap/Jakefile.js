var logger = require('loggerjs')('curapps')
  , fs = require('fs.extra')
  , mkdirp = require('mkdirp')
  , path = require('path')
  , async = require('async')
  , recess = require('recess')
  , ncp = require('ncp').ncp
  , util = require('util')
  , readDirFiles = require('read-dir-files')

var mkdir = function(filename, cb) {
  mkdirp(filename, 0755, function(err) {
    if (err) throw err
    cb && cb()
  })
}

var logs = [
    'Building fonts...',
    'Building less....',
    'Building js......'
  ];
var concat = function(opts, cb) {
  var fileList = opts.src;
  var distPath = opts.dest;
  var output = [];
  var readFile = function(index, fileList) {
    if (index < fileList.length) {
      var filepath = fileList[index];
      fs.readFile(filepath, 'utf-8', function(err, data) {
        if (err) {
          return cb(err);
        }
        output.push(data);
        readFile(index+1, fileList);
      });
    } else {
      fs.writeFile(distPath, output.join('\n'), 'utf-8', function(err) {
      
        if (err) {
          logger.error(err);
          return cb(err);
        }
        return cb(null);
      });
    }
  }
  readFile(0, fileList);
}

var buildFonts = function(cb) {
  console.log(logs[0])
  ncp(path.join(__dirname, 'font'), path.join(__dirname, 'assets', 'font'), function(err) {
    if (err) return cb && cb(err)
    return cb && cb()
  })
}

var buildLess = function(cb) {
  console.log(logs[1])
  mkdir(path.join(__dirname, 'assets', 'css'), function() {
    async.series([
      function(c) {
        recess('./less/bootstrap.less', { compile: true }, function(err, obj) {
          console.log(Object.keys(obj[0]))
          if (err) {
            logger.error('Error compiling stylesheet:', err)
            return c && c(err)
          }
          fs.writeFile('./assets/css/style.css', obj[0].output, function(err) {
            if (err) {
              logger.error('Error writing stylesheet to file:', err)
              return c && c(err)
            }
            return c && c()
          })
        })
      },
      function(c) {
        recess('./less/responsive.less', { compile: true }, function(err, obj) {
          if (err) {
            logger.error('Error compiling stylesheet:', err)
            return c && c(err)
          }
          fs.writeFile('./assets/css/style-responsive.css', obj[0].output, function(err) {
            if (err) {
              logger.error('Error writing stylesheet to file:', err)
              return c && c(err)
            }
            return c && c()
          })
        })
      }
    ], function(c) {
      return cb(c)
    })
  })
}

var buildJS = function(cb) {
  mkdir(path.join(__dirname, 'assets', 'js'), function() {
    console.log(logs[2]);
    concat({
      src: [
        path.join(__dirname, 'js', 'bootstrap-transition.js'),
        path.join(__dirname, 'js', 'bootstrap-alert.js'),
        path.join(__dirname, 'js', 'bootstrap-button.js'),
        path.join(__dirname, 'js', 'bootstrap-collapse.js'),
        path.join(__dirname, 'js', 'bootstrap-dropdown.js'),
        path.join(__dirname, 'js', 'bootstrap-modal.js'),
        path.join(__dirname, 'js', 'bootstrap-tooltip.js'),
        path.join(__dirname, 'js', 'bootstrap-popover.js'),
        path.join(__dirname, 'js', 'bootstrap-tab.js')
      ],
      dest: path.join(__dirname, 'assets', 'js', 'bootstrap.js')
    }, function(err, data) {
      if (err) {
        logger.failed();
        logger.error(err);
        return cb && cb(err);
      }
    });
  });

}

var buildAll = function() {
  logger.info('Building assets')
  async.series([
    function(cb) {
      buildFonts(function(err, data) {
        if (err) {
          logger.error(err)
          return cb(err)
        } else {
          return cb(null, data)
        }
      })
    },
    function(cb) {
      buildLess(function(err, data) {
        if (err) return cb(err)
        return cb(null, data)
      })
    },
    function(cb) {
      buildJS(function(err, data) {
        if (err) return cb(err)
        return cb(null, data)
      })
    }
  ])
}

desc('Build into assets directory')
task('build', function() {
  buildAll()
})

desc('Build fonts')
task('build-fonts', function() {
  logger.info('Building fonts')
  buildFonts()
})

desc('Build less')
task('build-less', function() {
  logger.info('Building less')
  buildLess()
})

desc('Build JS')
task('build-js', function() {
  logger.info('Building js')
  buildJS()
})

desc('help')
task('default', function() {
  console.log()
  logger.info('  Usage:')
  logger.info('    jake <command>')
  logger.info('')
  logger.info('  Commands:')
  logger.info('')
  logger.info('    build          - Build in assets dir')
  logger.info('    build-fonts    - Build fonts')
  logger.info('    build-js       - Build js')
  logger.info('    build-less     - Build less')
  logger.info('')
  console.log()
})