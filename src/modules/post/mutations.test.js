import { mockDb as db } from 'helpers/tests';
import * as mutations from './mutations';

describe('Post mutations', () => {
  const currentUserID = 'ui';
  const context = {
    db,
    session: {
      currentUserID,
    },
  };

  describe('Create', () => {
    it('handles mutations and returns payload', async () => {
      const input = {
        title: 'test title',
        text: 'test text',
      };
      const payload = await mutations.Create({}).mutateAndGetPayload(input, context);

      payload.should.have.deep.property('changedPost.title', 'test title');
      payload.should.have.deep.property('changedPost.text', 'test text');
      payload.should.have.deep.property('changedPost.authoredByUserID', currentUserID);
    });
  });
});
