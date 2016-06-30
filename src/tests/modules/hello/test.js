import { spy } from 'sinon';
import * as hello from 'modules/hello';

describe('hello', () => {
  const res = { send: spy() };
  const defaultResponse = 'Hello World!';

  afterEach(() => {
    res.send.reset();
  });

  describe('get', () => {
    it('returns "Hello World!"', () => {
      hello.get({}, res);
      res.send.should.have.been.calledWith(defaultResponse);
    });
  });

  describe('post', () => {
    it('returns request.text if present', () => {
      const text = 'test';

      hello.post({ text }, res);
      res.send.should.have.been.calledWith(text);
    });

    it('returns "Hello World!" if request.text is blank', () => {
      hello.get({}, res);
      res.send.should.have.been.calledWith(defaultResponse);
    });
  });
});
