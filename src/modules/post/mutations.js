import assert from 'assert';
import { chain, isNil, isBoolean } from 'lodash';
import { stripId } from 'helpers/data';

export const Create = types => ({
  name: 'CreatePost',
  inputFields: {
    title: types.String,
    text: types.String,
    categoryId: types.ID,
  },
  outputFields: {
    changedPost: types.Post,
  },
  mutateAndGetPayload: async (
    { title, text, categoryId },
    { db, session: { currentUserId } }
  ) => {
    assert(title, 'Posts must have a title.');
    assert(text, 'Posts must have text.');
    assert(categoryId, 'Posts must have category Ids.');

    const changedPost = await db.insert('posts', {
      createdAt: new Date(),
      updatedAt: new Date(),
      authoredByUserId: currentUserId,
      listedByCategoryId: stripId(categoryId),
      title,
      text,
    });

    return { changedPost };
  },
});

export const Update = types => ({
  name: 'UpdatePost',
  inputFields: {
    id: types.ID,
    title: types.String,
    text: types.String,
  },
  outputFields: {
    changedPost: types.Post,
  },
  mutateAndGetPayload: async (
    input,
    { db, session: { currentUserId } }
  ) => {
    const strippedId = stripId(input.id);

    const { authoredByUserId } = await db.findBy('posts', { id: strippedId });

    assert(currentUserId === authoredByUserId, 'That is not your post!');

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
    assert(changedPost, 'Unable to find that Post');

    return { changedPost };
  },
});

export const Delete = types => ({
  name: 'DeletePost',
  inputFields: {
    id: types.ID,
  },
  outputFields: {
    deletedId: types.ID,
  },
  mutateAndGetPayload: async (
    { id },
    { db, session: { currentUserId } }
  ) => {
    const strippedId = stripId(id);
    const { authoredByUserId } = await db.findBy('posts', { id: strippedId });

    assert(currentUserId === authoredByUserId, 'That is not your post!');

    await db.deleteBy(
      'posts',
      { id: strippedId }
    );

    return { deletedId: strippedId };
  },
});

export const Star = types => ({
  name: 'ToggleStarPost',
  inputFields: {
    postId: types.ID,
    toggle: types.Boolean,
  },
  outputFields: {
    starredOrNot: types.Boolean,
  },
  mutateAndGetPayload: async (
    { postId, toggle },
    { db, session: { currentUserId } }
  ) => {
    assert(!isNil(currentUserId), 'Must be logged in to star posts!');
    assert(postId, 'Must provide a post ID!');
    assert(isBoolean(toggle), 'Must provide true or false in toggle');

    if (toggle) {
      await db.insert('user_starred_posts', {
        userId: currentUserId,
        starredPostId: stripId(postId),
      });
    } else {
      await db.deleteBy(
        'user_starred_posts',
        {
          userId: currentUserId,
          starredPostId: stripId(postId),
        }
      );
    }

    return { starredOrNot: toggle };
  },
});

