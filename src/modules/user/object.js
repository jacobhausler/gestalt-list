import crypto from 'crypto';

export default {
  name: 'User',
  fields: {
    fullName: ({ firstName, lastName }) => (
      lastName
        ? [firstName, lastName].join(' ')
        : firstName
    ),
    profileImage: ({ email }, { size }) => {
      const hash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
      return `//www.gravatar.com/avatar/${hash}?d=mm&s=${size || 200}`;
    },
    following: async ({ id }, args, { db, session }) => {
      const follows = await db.queryBy('user_followed_users', {
        userID: session.currentUserId,
        followedUserId: id,
      });
      return follows.length > 0;
    },
  },
};
