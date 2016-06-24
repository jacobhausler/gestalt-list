import { spy } from 'sinon';
import { bindRoutes } from 'routes';

describe('routes', () => {
  it('binds routes given a valid config', () => {
    const firstHandler = () => 'first';
    const secondHandler = () => 'second';
    const config = [
      { path: '/first', method: 'get', handler: firstHandler },
      { path: '/second', method: 'post', handler: secondHandler },
    ];
    const app = {
      get: spy(),
      post: spy(),
    };

    bindRoutes(config, app);
    app.get.should.have.been.calledWith('/first', firstHandler);
    app.post.should.have.been.calledWith('/second', secondHandler);
  });

  it('binds route with "use" method if config.method is undefined', () => {
    const handler = () => 'test';
    const config = [{ path: '/test', handler }];
    const app = { use: spy() };

    bindRoutes(config, app);
    app.use.should.have.been.calledWith('/test', handler);
  });
});
