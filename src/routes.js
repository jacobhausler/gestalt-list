import { partial } from 'lodash';
import { hello } from 'modules';

const routesConfig = [
  { path: '/', method: 'get', handler: hello.get },
  { path: '/', method: 'post', handler: hello.post },
];

export const bindRoutes = (config, app) => {
  config.forEach(({ method = 'use', path, handler }) => (
    app[method](path, handler)
  ));
};

export default partial(bindRoutes, routesConfig);
