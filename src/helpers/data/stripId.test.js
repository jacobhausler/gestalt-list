import stripId from './stripId';

describe('stripId', () => {
  it('should return an id given a Type:Id', () => {
    stripId('Type:123456').should.equal('123456');
  });
});

