import { expect } from 'chai';
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
    expect(app.get).to.have.been.calledWith('/first', firstHandler);
    expect(app.post).to.have.been.calledWith('/second', secondHandler);
  });

  it('binds route with "use" method if config.method is undefined', () => {
    const handler = () => 'test';
    const config = [{ path: '/test', handler }];
    const app = { use: spy() };

    bindRoutes(config, app);
    expect(app.use).to.have.been.calledWith('/test', handler);
  });
});
