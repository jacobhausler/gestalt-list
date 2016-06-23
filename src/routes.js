import { hello } from 'modules';

export default app => {
  app.use('/', hello);
};
