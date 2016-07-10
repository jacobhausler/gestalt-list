import stripId from './stripId';

describe('stripId', () => {
  it('should return an id given a Type:Id', () => {
    stripId('Type:123456').should.deep.equal('123456');
  });
});

