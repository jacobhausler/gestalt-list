import assert from 'assert';
import bcrypt from 'bcrypt-as-promised';
import uuid from 'uuid';

export const Update = types => ({
  name: 'UpdateUser',
  inputFields: {
    email: types.String,
    password: types.String,
    firstName: types.String,
    lastName: types.String,
  },
  outputFields: {
    // changedUser: types.User,
    placeholder: types.String,
  },
  mutateAndGetPayload: () => ({
    placeholder: 'Waiting for gestalt-postgres to add update method to DatabaseConnector',
  }),
});

export const SignIn = types => ({
  name: 'SignIn',
  inputFields: {
    email: types.String,
    password: types.String,
  },
  outputFields: {
    session: types.Session,
  },
  mutateAndGetPayload: async (input, context) => {
    const { email, password } = input;
    const { db, session } = context;

    try {
      const user = await db.findBy('users', { email });
      await bcrypt.compare(password, user.passwordHash);

      session.currentUserID = user.id;
      session.id = uuid.create().hex;

      return { session };
    } catch (e) {
      throw new Error('Email or password is invalid');
    }
  },
});

export const SignOut = types => ({
  name: 'SignOut',
  inputFields: {},
  outputFields: {
    session: types.Session,
  },
  mutateAndGetPayload: (input, context) => {
    const { session } = context;
    session.currentUserID = null;

    const id = uuid.create().hex;
    session.id = id;

    return { session };
  },
});

export const SignUp = types => ({
  name: 'SignUp',
  inputFields: {
    userId: types.String,
    email: types.String,
    password: types.String,
    firstName: types.String,
    lastName: types.String,
  },
  outputFields: {
    session: types.Session,
  },
  mutateAndGetPayload: async (input, context) => {
    const { email, password, firstName, lastName } = input;
    const { db, session } = context;

    assert(email.match(/.+@.+?\..+/), 'Email is invalid');
    assert(password.length > 5, 'Password is invalid');

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await db.insert('users', {
      createdAt: new Date(),
      updatedAt: new Date(),
      email,
      passwordHash,
      firstName,
      lastName,
    });

    session.currentUserID = user.id;
    session.id = uuid.create().hex;
    return { session };
  },
});

export const Follow = types => ({
  name: 'FollowUser',
  inputFields: {
    userID: types.ID,
  },
  outputFields: {
    followedUser: types.User,
    currentUser: types.User,
  },
  mutateAndGetPayload: async (input, context) => {
    const { db, session } = context;
    const { currentUserID } = session;
    const followedUserID = input.userID;

    await db.exec(
      'INSERT INTO user_followed_users (user_id, followed_user_id) ' +
      'VALUES ($1, $2);',
      [currentUserID, followedUserID]
    );

    const currentUser = await db.findBy('users', { id: currentUserID });
    const followedUser = await db.findBy('users', { id: followedUserID });

    return { currentUser, followedUser };
  },
});

export const Unfollow = types => ({
  name: 'UnfollowUser',
  inputFields: {
    userID: types.ID,
    follow: types.Boolean,
  },
  outputFields: {
    user: types.User,
    currentUser: types.User,
  },
  mutateAndGetPayload: async (input, context) => {
    const { db, session } = context;
    const { currentUserID } = session;
    const followedUserID = input.userID.split(':')[1];

    await db.deleteBy(
      'user_followed_users',
      { userId: currentUserID, followedUserID }
    );

    const currentUser = await db.findBy('users', { id: currentUserID });
    const user = await db.findBy('users', { id: followedUserID });

    return { currentUser, user };
  },
});
