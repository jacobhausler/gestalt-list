import assert from 'assert';

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
    locationId: types.String,
  },
  outputFields: {
    currentUser: types.User,
  },
  mutateAndGetPayload: async (input, context) => {
    const { locationId } = input;
    const { db, session } = context;
    const { currentUserID } = session;

    await db.deleteBy('locations', { id: locationId });
    const user = await db.findBy('users', { id: currentUserID });

    return { user };
  },
});
