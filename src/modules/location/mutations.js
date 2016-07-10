import assert from 'assert';
import { stripId } from 'helpers/data';

export const Create = types => ({
  name: 'CreateLocation',
  inputFields: {
    name: types.String,
  },
  outputFields: {
    changedLocation: types.Location,
  },
  mutateAndGetPayload: async (input, context) => {
    const { name } = input;
    const { db } = context;

    assert(name.length > 0, 'Locations must have names');

    const changedLocation = await db.insert('locations', {
      createdAt: new Date(),
      name,
    });

    return { changedLocation };
  },
});

export const Delete = types => ({
  name: 'DeleteLocation',
  inputFields: {
    locationId: types.ID,
  },
  outputFields: {
    currentUser: types.User,
  },
  mutateAndGetPayload: async (input, context) => {
    const { locationId } = input;
    const { db, session } = context;
    const { currentUserId } = session;

    await db.deleteBy('locations', { id: stripId(locationId) });
    const user = await db.findBy('users', { id: currentUserId });

    return { user };
  },
});
