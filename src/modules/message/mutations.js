import assert from 'assert';
import { stripId } from 'helpers/data';

export const Send = types => ({
  name: 'SendMessage',
  inputFields: {
    conversationId: types.ID,
    body: types.String,
  },
  outputFields: {
    changedMessage: types.Message,
  },
  mutateAndGetPayload: async (
    { chatId, body },
    { db, session: { currentUserId } }
  ) => {
    assert(body, 'Messages must have bodies');
    assert(chatId, 'Messages must have a ChaatId!');
    assert(currentUserId, 'You must be logged in!');

    // updates updatedAAt on the convo or fails if convo doesn't exist
    const currentConversation = await db.update(
      'conversations',
      { id: stripId(conversationId) },
      { updatedAt: new Date() },
    );

    const changedMessage = await db.insert('messages', {
      createdAt: new Date(),
      authoredByUserId: currentUserId,
      heldByConversationId: stripId(conversationId),
      body,
    });

    return { changedMessage };
  },
});