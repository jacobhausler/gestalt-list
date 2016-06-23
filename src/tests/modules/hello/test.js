import { expect } from 'chai';
import { spy } from 'sinon';
import hello from 'modules/hello';

describe('hello', () => {
  it('returns "Hello world!" when request is blank', () => {
    const res = { send: spy() };

    hello({}, res);
    expect(res.send).to.have.been.calledWith('Hello World!');
  });

  it('returns request text when present', () => {
    const res = { send: spy() };

    hello({ text: 'test' }, res);
    expect(res.send).to.have.been.calledWith('test');
  });
});
