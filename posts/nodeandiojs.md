Recently, I've seen a few people asking about running both [node.js](https://nodejs.org) and [iojs](https://iojs.org) concurrently, especially during the development lifecycle of an application. There are a couple of routes that one can take to accomplish this.

## `node-bin` / `iojs-bin`

Both [node-bin](https://github.com/aredridel/node-bin) and [iojs-bin](https://github.com/aredridel/iojs-bin) are packages on the [npm](https://npmjs.org) registry. They can be installed like any other package.

```bash
$ npm install --save node-bin
# or
$ npm install --save iojs-bin
```

Say you wanted to use `node` on this particular project. In your `package.json`, you could create a `start` script like so:

```js
{
  "name": "project",
  "version": "1.0.0",
  "scripts": {
    "start": "./node_modules/.bin/node index.js"
  }
}
```

To use `iojs`, simply change your `package.json` to look something like:

```js
{
  "name": "project",
  "version": "1.0.0",
  "scripts": {
    "start": "./node_modules/.bin/iojs index.js"
  }
}
```

Thanks to [@aredridel](https://twitter.com/aredridel) for `node-bin` and `iojs-bin`!

***

## `nvm`

A slightly different solution to solve this problem would be to use a version manager like [nvm](https://github.com/creationix/nvm). One can follow the instructions in the readme to install `nvm`.

First, install a version of `node`:

```bash
$ nvm install 0.12
```

Then, install a version of `iojs`:

```bash
$ nvm install iojs
```

To activate one of the versions:

```bash
$ nvm use iojs
# or
$ nvm use 0.10
```

***

## `n`

Being that my preferred shell is `fish` and `nvm` does not work with `fish`, I had to explore other alternatives. Enter [n](https://github.com/tj/n).

`n` is similar to `nvm` in some ways, but it actually works with `fish`.

To install `n`:

```bash
$ npm install -g n
```

`n` has very similar commands to `nvm`. Running `n` without any arguments will show a list of available versions to install or activate.

To install the latest version of `node`:

```bash
$ n latest
```

To install the latest version of `iojs`:

```bash
$ n io latest
```

***

That wraps it up. If you have any questions/comments/issues, please feel free to reach out to me [@evanhlucas](https://twitter.com/evanhlucas)!
