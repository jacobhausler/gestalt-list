import { expect } from 'chai';
import { spy } from 'sinon';
import { omit, merge } from 'lodash';
import { createMockDb } from 'helpers/tests';
import * as mutations from './mutations';

describe('Post mutations', () => {
  const table = 'posts';
  const currentUserID = 'u1';
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
    const mutation = mutations.Create({}).mutateAndGetPayload;
    const dbInsert = spy(db, 'insert');
    const input = {
      title: 'test title',
      text: 'test text',
    };
    let payload;

    before(async done => {
      payload = await mutation(input, context);
      done();
    });

    it('should fail if no title is present', async done => {
      try {
        await mutation(omit(input, 'title'), context);
        done(new Error('Mutation completed without asserting error.'));
      } catch (e) {
        done();
      }
    });

    it('should fail if no text is present', async done => {
      try {
        await mutation(omit(input, 'text'), context);
        done(new Error('Mutation completed without asserting error.'));
      } catch (e) {
        done();
      }
    });

    it('should call db.insert on posts table', () => {
      dbInsert.should.have.been.calledWith(table);
    });

    it('should call db.insert with created record', () => {
      const record = dbInsert.args[0][1];

      record.should.have.all.keys([
        'createdAt',
        'updatedAt',
        'title',
        'text',
        'authoredByUserId',
      ]);
    });

    it('should return a record with created title', () => {
      payload.should.have.deep.property('changedPost.title', input.title);
    });

    it('should return a record with created text', () => {
      payload.should.have.deep.property('changedPost.text', input.text);
    });

    it('should return a record with current user as authored relationship', () => {
      payload.should.have.deep.property('changedPost.authoredByUserId', currentUserID);
    });
  });

  describe('Update', () => {
    const mutation = mutations.Update({}).mutateAndGetPayload;
    const dbUpdate = spy(db, 'update');
    const now = new Date();
    const input = {
      id: 'Post:p1',
      updatedAt: now,
      title: 'next title',
      text: 'next text',
    };
    let payload;

    before(async done => {
      payload = await mutation(input, context);
      done();
    });

    it('should fail if no author is not current user', async done => {
      try {
        await mutation(input, merge({}, context, {
          session: {
            currentUserID: 'u2',
          },
        }));
        done(new Error('Mutation completed without asserting error.'));
      } catch (e) {
        done();
      }
    });

    it('should call db.update on posts table', () => {
      dbUpdate.should.have.been.calledWith(table);
    });

    it('should call db.update with id param', () => {
      const params = dbUpdate.args[0][1];
      input.id.should.contain(params.id);
    });

    it('should call db.update with updated record attributes', () => {
      const attrs = dbUpdate.args[0][2];
      attrs.should.have.all.keys(['updatedAt', 'title', 'text']);
    });

    it('should return a record with updated title', () => {
      payload.should.have.deep.property('changedPost.title', input.title);
    });

    it('should return a record with updated text', () => {
      payload.should.have.deep.property('changedPost.text', input.text);
    });

    it('should return a record with updated updatedAt', () => {
      expect(payload).deep.property('changedPost.updatedAt').to.be.an.instanceof(Date);
      expect(payload).deep.property('changedPost.updatedAt').to.not.equal(now);
    });
  });

  describe('Delete', () => {
    const mutation = mutations.Delete({}).mutateAndGetPayload;
    const dbDeleteBy = spy(db, 'deleteBy');
    const input = {
      id: 'Post:p1',
    };
    let payload;

    before(async done => {
      payload = await mutation(input, context);
      done();
    });

    it('should fail if no author is not current user', async done => {
      try {
        await mutation(input, merge({}, context, {
          session: {
            currentUserID: 'u2',
          },
        }));
        done(new Error('Mutation completed without asserting error.'));
      } catch (e) {
        done();
      }
    });

    it('should call db.deleteBy on posts table', () => {
      dbDeleteBy.should.have.been.calledWith(table);
    });

    it('should call db.deleteBy with id param', () => {
      const params = dbDeleteBy.args[0][1];
      input.id.should.contain(params.id);
    });

    it('should return the deleted record id', () => {
      input.id.should.contain(payload.deletedId);
    });
  });
});
