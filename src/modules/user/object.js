import crypto from 'crypto';
import { reduce } from 'lodash';

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

      const messageNotificationCount = reduce(userConvos, async (count, convo) => {
        console.log(count, convo);
        const messageCount = await db.exec(
          'SELECT COUNT(*) FROM messages WHERE held_by_conversation_id=$1 ' +
          'AND authored_by_user_id!=$2 AND seen!=true;',
          [convo.chattedConversationId, session.currentUserId],
        );

        return count + messageCount;
      });

      return messageNotificationCount;
    },
  },
};

