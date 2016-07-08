import assert from 'assert';
import { chain, isNil } from 'lodash';

export const Create = types => ({
  name: 'CreatePost',
  inputFields: {
    title: types.String,
    text: types.String,
  },
  outputFields: {
    changedPost: types.Post,
  },
  mutateAndGetPayload: async (
    { title, text },
    { db, session: { currentUserID } }
  ) => {
    assert(title, 'Posts must have a title.');
    assert(text, 'Posts must have text.');

    const changedPost = await db.insert('posts', {
      createdAt: new Date(),
      updatedAt: new Date(),
      authoredByUserId: currentUserID,
      title,
      text,
    });

    return { changedPost };
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
  mutateAndGetPayload: async (
    input,
    { db, session: { currentUserID } }
  ) => {
    const [/* type */, strippedId] = input.id.split(':');
    const { authoredByUserId } = await db.findBy('posts', { id: strippedId });

    assert(currentUserID === authoredByUserId, "That's not your post!");

    const changedFields = chain(input)
      .omit(['id', 'clientMutationId'])
      .omitBy(isNil)
      .value();

    // the update method returns an array of updated rows
    const [changedPost] = await db.update(
      'posts',
      { id: strippedId },
      {
        ...changedFields,
        updatedAt: new Date(),
      },
    );

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
  mutateAndGetPayload: async (
    { id },
    { db, session: { currentUserID } }
  ) => {
    const [/* type */, strippedId] = id.split(':');
    const { authoredByUserId } = await db.findBy('posts', { id: strippedId });

    assert(currentUserID === authoredByUserId, "That's not your post!");

    await db.deleteBy(
      'posts',
      { id: strippedId }
    );

    return { deletedId: strippedId };
  },
});
