A few months ago, I had to come up with a way to host multiple [node.js](http://nodejs.org) applications on a single server.  Having used [stagecoach](https://github.com/punkave/stagecoach) on my Ubuntu servers before, I figured that a similar setup would suffice.  I did not quite like the way that stagecoach deployed the apps.  It uses a awesome module, [forever](https://github.com/nodejitsu/forever), to ensure that the apps stay up and restart in the event of a crash.  I found myself wanting something more native to manage my apps.  Being that a launchd runs as PID 1 on current Macs, I thought that would be a great place to start.  I started digging into the source code available at opensource.apple.com and immediately started liking it.  The end result ended up being [node-launchctl](https://github.com/evanlucas/node-launchctl).  It provides native bindings to launchctl (the command line application used to control daemons and services) for [node.js](http://nodejs.org).

### Dependencies
- OS X 10.8+ (Possibly 10.7, but not tested)
- Xcode 4.5+
- [Node.js](http://nodejs.org) v0.10.x

### Installation

```bash
$ npm install launchctl
```

### Usage

To require the module

```javascript
var ctl = require('launchctl')
```

### Examples

To list the jobs that are currently managed by launchd

```javascript
ctl.list(function(err, jobs) {
  if (err) throw err
  console.log(jobs)
  // => [
  // =>   {
  // =>     Label: 'com.apple.launchctl.Background',
  // =>     LimitLoadToSessionType: 'Background',
  // =>     OnDemand: 1,
  // =>     LastExitStatus: 0,
  // =>     TimeOut: 30,
  // =>     ProgramArguments: ['/bin/launchctl', 'bootstrap', '-S', 'Background']
  // =>   }
  // =>   { .. }
  // => ]
})
```

You can also start/stop/load/unload apps

```javascript
ctl.load('/Users/evan/Library/LaunchAgents/homebrew.mxcl.mongodb.plist', function(err) {
  if (err) {
    console.log('Error:', err)
  } else {
    console.log('Success')
  }
})
```

node-launchctl offers both sync and async functions for most of launchctl's functionality.  The source is available on Github at [https://github.com/evanlucas/node-launchctl](https://github.com/evanlucas/node-launchctl) and you can check out the documentation at [http://evanlucas.github.io/node-launchctl](http://evanlucas.github.io/node-launchctl).
