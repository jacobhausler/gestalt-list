import casual from 'casual';
import { times } from 'lodash';

export const Seed = types => ({
  name: 'SeedDB',
  inputFields: {
    seed: types.Int,
  },
  outputFields: {
    successString: types.String,
  },
  mutateAndGetPayload: async (
    { seed },
    { db }
  ) => {
    casual.seed(seed);

    times(5, () => {
      return db.insert(
        'Locations',
        {
          createdAt: new Date(),
          name: casual.city,
        }
        ).then(location => {
          const locId = location.id;
          return db.insert(
            'Lists',
            {
              createdAt: new Date(),
              name: casual.title,
              ownedByLocationId: locId,
            }
        ).then((list) => {
          const listId = list.id;
          return db.insert(
            'Categories',
            {
              createdAt: new Date(),
              name: casual.title,
              listedByListId: listId,
            });
        });
        });
    });

    return { successString: 'Yay check the db' };
  },
});
