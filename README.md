# Node Boilerplate


## Install

From a blank directory:

```
git clone git@github.com:slightlytyler/node-boilerplate.git .
npm install
```

#### CI Setup

Activate your repo on Travis and away you go!

## Development

```
npm run dev
```

Navigate to `localhost:3000` and you should see "Hello World!".

## Type checking

Type checking is performed by [Flow](https://flowtype.org/) during the build step. To opt in a file add a

```javascript
// @flow
```

comment at the top of the file and it will be checked.

## Testing

Test files must be named `test.js`. Place them in the appropriate subdirectories of `src/tests`.

You will need to familiarize yourself with [mocha](https://mochajs.org/), [chai](http://chaijs.com/), [sinon](http://sinonjs.org/), and [sinon-chai](https://github.com/domenic/sinon-chai).

#### Single run

```
npm run test
```

#### Watch

```
npm run test:watch
```

## Deployment

```
npm run deploy
```
