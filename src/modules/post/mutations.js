import assert from 'assert';
import { chain, isUndefined } from 'lodash';

export const Create = types => ({
  name: 'CreatePost',
  inputFields: {
    title: types.String,
    text: types.String,
  },
  outputFields: {
    changedPost: types.Post,
  },
  mutateAndGetPayload: async (input, context) => {
    const { title, text } = input;
    const { db, session } = context;
    const { currentUserID } = session;

    assert(title.length > 0, 'Posts must have titles');
    assert(text.length > 0, 'Posts must have text');

    await db.findBy('users', { id: currentUserID });

    const changedPost = await db.insert('posts', {
      createdAt: new Date(),
      updatedAt: new Date(),
      authoredByUserID: currentUserID,
      title,
      text,
    });

    return { changedPost };
  },
});

export const Delete = types => ({
  name: 'DeletePost',
  inputFields: {
    id: types.String,
  },
  outputFields: {
    deletedId: types.String,
  },
  mutateAndGetPayload: async (input, context) => {
    const { id } = input;
    const { db, session } = context;
    const { currentUserID } = session;
    const strippedId = id.split(':')[1];

    const oldPost = await db.findBy('posts', { id: strippedId });

    assert(currentUserID === oldPost.authoredByUserId, "That's not your post!");

    await db.deleteBy(
      'posts',
      { id: strippedId }
    );

    const deletedId = strippedId;

    return { deletedId };
  },
});

export const Update = types => ({
  name: 'UpdatePost',
  inputFields: {
    id: types.String,
    title: types.String,
    text: types.String,
  },
  outputFields: {
    changedPost: types.Post,
  },
  mutateAndGetPayload: async (input, context) => {
    const { id } = input;
    const { db, session } = context;
    const { currentUserID } = session;
    const strippedId = id.split(':')[1];

    // will fail if the post doesn't exist
    const oldPost = await db.findBy('posts', { id: strippedId });

    assert(currentUserID === oldPost.authoredByUserId, "That's not your post!");

    const changeFields = chain(input)
      .omit('id')
      .omit('clientMutationId')
      .omitBy(isUndefined)
      .value();

    const updates = {
      ...changeFields,
      updatedAt: new Date(),
    };

    // the update method returns an array of updated rows
    const returnPost = await db.update(
      'posts',
      { id: strippedId },
      updates,
    );

    const changedPost = returnPost[0];

    return { changedPost };
  },
});

