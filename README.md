# Node Boilerplate

[![Build Status](http://192.168.111.92/api/badges/tmartinez/node-boilerplate/status.svg)](http://192.168.111.92/tmartinez/node-boilerplate)


## Install

From a blank directory:

```
git clone https://github.phytel.com/tmartinez/node-boilerplate.git .
npm install
```

#### CI Setup

After making an inital commit visit the [dashboard](http://192.168.111.92), login with your github enterprise account, find your repo under the `Available Repositories` tab and activate! When commiting to master or a PR you should see a build in the dashboard as well as indicators on Github. Drone comes preconfigured but can be customized in the `drone.yml` file.

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
