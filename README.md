# gestalt-list

[![Build Status](https://travis-ci.org/jacobhausler/gestaltCLP2.svg?branch=master)](https://travis-ci.org/jacobhausler/gestaltCLP2)

## Install

Start Postgres

From a blank directory:

```
git clone git@github.com:jacobhausler/gestalt-list.git .
npm install
createdb gestalt-list
gestalt migrate
```

## Development

```
npm run dev
```

API and graphiql are both served from 'localhost:8000/graphql'

## Testing

All files in `src` named `test.js` or ending with `.test.js` are aggregated and run. Tests should be colocated with their source files.

You will need to familiarize yourself with [mocha](https://mochajs.org/), [chai](http://chaijs.com/), [sinon](http://sinonjs.org/), [sinon-chai](https://github.com/domenic/sinon-chai), and [gestalt](https://github.com/charlieschwabacher/gestalt).

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
