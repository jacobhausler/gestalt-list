import assert from 'assert';
import { stripId } from 'helpers/data';
import { isNil, chain } from 'lodash';

export const Start = types => ({
  name: 'StartConversation',
  inputFields: {
    subject: types.String,
    refPostId: types.ID,
    toUserId: types.ID,
  },
  outputFields: {
    changedConversation: types.Conversation,
  },
  mutateAndGetPayload: async (
    { subject, refPostId, toUserId },
    { db, session: { currentUserId } }
  ) => {
    assert(subject, 'Conversations must have subjects');
    assert(toUserId, 'Conversations must have a toUserId');

    // will fail if toUser doesn't exist
    const toUser = await db.findBy('users', { id: stripId(toUserId) });
    // if refPostId has a value, this will fail if the post doesn't exist
    if (!isNil(refPostId)){
      const refPost = await db.findBy('posts', { id: stripId(refPostId) });
    }

    // create and clean the insertFields
    const insertFields = chain({
      createdAt: new Date(),
      updatedAt: new Date(),
      referencedPostId: stripId(refPostId),
      subject,
    }).omitBy(isNil).value();

    const changedConversation = await db.insert(
      'conversations',
      insertFields
    );

    // add both users to the conversation
    const addedCurrentUser = await.db.insert(
      'user_chatted_conversations',
      {
        userId: currentUserId,
        chattedConversationId: changedConversation.id,
      }
    );
    const addedToUser = await.db.insert(
      'user_chatted_conversations',
      {
        userId: currentUserId,
        chattedConversationId: changedConversation.id,
      }
    );

    return { changedConversation };
  },
});