import { expect } from 'chai';
import { spy } from 'sinon';
import * as hello from 'modules/hello';

describe('hello', () => {
  describe('get', () => {
    it('returns "Hello World!"', () => {
      const res = { send: spy() };

      hello.get({}, res);
      expect(res.send).to.have.been.calledWith('Hello World!');
    });
  });

  describe('post', () => {
    it('returns request.text if present', () => {
      const res = { send: spy() };

      hello.post({ text: 'test' }, res);
      expect(res.send).to.have.been.calledWith('test');
    });

    it('returns "Hello World!" if request.text is blank', () => {
      const res = { send: spy() };

      hello.get({}, res);
      expect(res.send).to.have.been.calledWith('Hello World!');
    });
  });
});
