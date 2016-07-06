import assert from 'assert';

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
    const { id, title, text } = input;
    const { db } = context;
    const strippedId = id.split(':')[1];
    const oldPost = await db.findBy('posts', { id: strippedId });
    const newPost = { ...oldPost, updatedAt: new Date(), title, text };

    await db.deleteBy(
      'posts',
      { id: strippedId }
    );

    const changedPost = await db.insert('posts', newPost);

    return { changedPost };
  },
});
