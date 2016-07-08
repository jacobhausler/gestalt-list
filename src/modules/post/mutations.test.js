import * as mutations from './mutations';

describe('Post mutations', () => {
  const context = {
    db: {
      insert: (_, record) => ({
        id: 'p1',
        ...record,
      }),
    },
    session: {
      currentUserID: 'u1',
    },
  };

  describe('Create', () => {
    it('handles mutations and returns payload', async () => {
      const input = {
        title: 'test title',
        text: 'test text',
      };
      const payload = await mutations.Create({}).mutateAndGetPayload(input, context);
      const { createdAt, updatedAt } = payload.changedPost;

      payload.should.deep.equal({
        changedPost: {
          id: 'p1',
          createdAt,
          updatedAt,
          title: 'test title',
          text: 'test text',
          authoredByUserID: 'u1',
        },
      });
    });
  });
});
