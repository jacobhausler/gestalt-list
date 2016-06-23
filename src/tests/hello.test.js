import { expect } from 'chai';
import { spy } from 'sinon';
import hello from 'modules/hello';

describe('hello', () => {
  it('returns "Hello world!" or request text', () => {
    const res = { send: spy() };

    hello({}, res);
    expect(res.send).to.have.been.calledWith('Hello World!');

    res.send.reset();

    hello({ text: 'test' }, res);
    expect(res.send).to.have.been.calledWith('test');
  });
});
