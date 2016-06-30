import { forEach } from 'lodash';
import { spy } from 'sinon';
import { bindRoutes } from 'routes';

describe('routes', () => {
  const app = {
    use: spy(),
    get: spy(),
    post: spy(),
  };
  const getPath = '/get';
  const getHandler = () => 'get';
  const postPath = '/post';
  const postHandler = () => 'post';
  const usePath = '/use';
  const useHandler = () => 'use';
  const config = [
    { path: getPath, method: 'get', handler: getHandler },
    { path: postPath, method: 'post', handler: postHandler },
    { path: usePath, handler: useHandler },
  ];

  afterEach(() => {
    forEach(app, method => method.reset());
  });

  it('binds routes given a valid config', () => {
    bindRoutes(config, app);

    app.get.should.have.been.calledWith(getPath, getHandler);
    app.post.should.have.been.calledWith(postPath, postHandler);
  });

  it('binds route with "use" method if config.method is undefined', () => {
    bindRoutes(config, app);
    app.use.should.have.been.calledWith(usePath, useHandler);
  });
});
