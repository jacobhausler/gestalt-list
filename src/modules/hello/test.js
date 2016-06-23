import { expect } from 'chai';
import { spy } from 'sinon';
import hello from './index.js';

describe('hello', () => {
  it('returns "Hello world!" for every request', () => {
    const res = { send: spy() };

    hello({}, res);
    expect(res.send).to.have.been.calledWith('Hello World!');

    res.send.reset();

    hello({ test: 'test' }, res);
    expect(res.send).to.have.been.calledWith('Hello World!');
  });
});
