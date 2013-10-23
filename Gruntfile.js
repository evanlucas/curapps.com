var fs           = require('fs')
  , serverScript = 'server.js'
  , cwd          = __dirname
  , path         = require('path')
  , title        = 'curapps'
  , scriptPath   = path.join(cwd, serverScript)

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/**\n' +
            ' * curapps.com v<%= pkg.version %>\n' +
            ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under the <%= pkg.license %> license\n' +
            ' */\n',
    cafemocha: {
      http: {
        src: 'tests/http.js',
        options: {
          ui: 'bdd',
          reporter: grunt.option('reporter') || 'spec',
          colors: true
        }
      }
    },

    env: grunt.option('env') || 'development',

    uglify: {
      options: {
        report: 'min',
        banner: '<%= banner %>'
      },
      style: {
        src: ['public/js/style.js'],
        dest: 'public/js/min/style.js'
      },
      contact: {
        src: ['public/js/contact.js'],
        dest: 'public/js/min/contact.js'
      },
      quote: {
        src: ['public/js/quote.js'],
        dest: 'public/js/min/quote.js'
      },
      support: {
        src: ['public/js/support.js'],
        dest: 'public/js/min/support.js'
      }
    },

    clean: ['public/js/min'],

    modverify: {
      main: {
        options: {
          excludes: [
              './config-priv'
            , '../config/config-priv'
          ]
        }
      }
    }
  })

  grunt.loadNpmTasks('grunt-cafe-mocha')
  grunt.loadNpmTasks('grunt-modverify')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-clean')

  grunt.registerTask('install', 'Install upstart configuration', function() {
    var done = this.async()
    grunt.log.write('Writing Upstart Configuration...')
    var script = [
        '# curapps - curapps website'
      , '#'
      , ''
      , 'description   "curapps website upstart script to provide reliable uptime"'
      , 'author        "Evan Lucas"'
      , ''
      , '# When to start the service'
      , 'start on runlevel [2345]'
      , ''
      , '# When to stop the service'
      , 'stop on runlevel [06]'
      , ''
      , '# Prepare the environment'
      , 'pre-start script'
      , '    mkdir -p /home/evan/node/logs'
      , '    mkdir -p /home/evan/pids'
      , '    chown -R evan /home/evan/node/logs'
      , 'end script'
      , ''
      , '# If the process quits unexpectedly, trigger a respawn'
      , 'respawn'
      , ''
      , '# Start the process'
      , 'exec start-stop-daemon --start --chuid evan --make-pidfile \\'
      , '--pidfile /home/evan/pids/curapps.pid \\'
      , '--exec /usr/local/bin/node -- \\'
      , scriptPath+' >> \\'
      , '/home/evan/node/logs/com.curapps.output.log 2>&1'
    ].join('\n')
    fs.writeFile('/etc/init/curapps.conf', script, 'utf8', function(err) {
      if (err) {
        grunt.fail.fatal(err)
      } else {
        grunt.log.ok()
        done()
      }
    })
  })

  grunt.registerTask('uninstall', 'Removes upstart configuration', function() {
    var done = this.async()
    grunt.log.write('Removing Upstart Configuration...')
    fs.unlink('/etc/init/curapps.conf', function(err) {
      if (err) {
        grunt.fail.fatal(err)
      } else {
        grunt.log.ok()
        done()
      }
    })
  })

  // Thanks gov't :]
  grunt.registerTask('debug', 'Debug server', function() {
    var done = this.async()
    var server = require('child_process').fork('./server.js')

    process.on('exit', function() {
      server.kill()
    })
  })

  grunt.registerTask('dist', ['clean', 'uglify'])
  grunt.registerTask('test', ['dist', 'modverify', 'cafemocha'])
  grunt.registerTask('default', 'test')
}