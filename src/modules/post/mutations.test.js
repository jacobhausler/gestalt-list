import { expect } from 'chai';
import { createMockDb } from 'helpers/tests';
import * as mutations from './mutations';

describe('Post mutations', () => {
  const currentUserID = 'ui';
  const db = createMockDb({
    findBy: (type, { id }) => ({
      id,
      title: 'test title',
      text: 'test text',
      authoredByUserId: currentUserID,
    }),
  });
  const context = {
    db,
    session: {
      currentUserID,
    },
  };

  describe('Create', () => {
    const input = {
      title: 'test title',
      text: 'test text',
    };
    let payload;

    before(async done => {
      payload = await mutations.Create({}).mutateAndGetPayload(input, context);
      done();
    });

    it('returns a record with created title', () => {
      payload.should.have.deep.property('changedPost.title', input.title);
    });

    it('return a record with created text', () => {
      payload.should.have.deep.property('changedPost.text', input.text);
    });

    it('returns a record with current user as authored relationship', () => {
      payload.should.have.deep.property('changedPost.authoredByUserID', currentUserID);
    });
  });

  describe('Update', () => {
    const now = new Date();
    const input = {
      id: 'Post:p1',
      updatedAt: now,
      title: 'next title',
      text: 'next text',
    };
    let payload;

    before(async done => {
      payload = await mutations.Update({}).mutateAndGetPayload(input, context);
      done();
    });

    it('returns a record with updated title', () => {
      payload.should.have.deep.property('changedPost.title', input.title);
    });

    it('returns a record with updated text', () => {
      payload.should.have.deep.property('changedPost.text', input.text);
    });

    it('returns a record with updated updatedAt', () => {
      expect(payload).deep.property('changedPost.updatedAt').to.be.an.instanceof(Date);
      expect(payload).deep.property('changedPost.updatedAt').to.not.equal(now);
    });
  });

  describe('Delete', () => {
    const input = {
      id: 'Post:p1',
    };
    let payload;

    before(async done => {
      payload = await mutations.Delete({}).mutateAndGetPayload(input, context);
      done();
    });

    it('returns the deleted record id', () => {
      input.id.should.contain(payload.deletedId);
    });
  });
});
