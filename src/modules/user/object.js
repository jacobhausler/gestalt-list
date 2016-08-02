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
        userId: session.currentUserId,
        followedUserId: id,
      });
      return follows.length > 0;
    },
    messageNotificationCount: async ({ id }, args, { db, session }) => {
      const userConvos = await db.queryBy('user_chatted_conversations',
        {
          userId: session.currentUserId,
        }
      );

      const messageNotificationCount = userConvos.reduce(async (count, convo) => {
        const messageCountRaw = await db.exec(
          'SELECT COUNT(*) FROM messages WHERE held_by_conversation_id=$1 ' +
          'AND authored_by_user_id!=$2 AND seen=$3;',
          [convo.chattedConversationId, session.currentUserId, false],
        );
        const messageCount = parseInt(messageCountRaw.rows[0].count, 10);

        return count + messageCount;
      }, 0);

      return messageNotificationCount;
    },
  },
};

