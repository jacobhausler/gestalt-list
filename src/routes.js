import { partial } from 'lodash';
import { hello } from 'modules';

const routesConfig = [
  { path: '/', handler: hello },
];

export const bindRoutes = (config, app) => {
  config.forEach(({ method = 'use', path, handler }) => (
    app[method](path, handler)
  ));
};

export default partial(bindRoutes, routesConfig);
