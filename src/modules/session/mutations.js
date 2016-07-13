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

    times(5, () =>
      db.insert(
        'Locations',
        {
          createdAt: new Date(),
          name: casual.city,
        }
        ).then(location => {
          const locId = location.id;
          return times(8, () => db.insert(
            'Lists',
            {
              createdAt: new Date(),
              name: casual.title,
              ownedByLocationId: locId,
            }
          )).then((lists) => {
            for (const list of lists) {
              const listId = list.id;
              times(casual.integer(4, 12), () => db.insert(
                'Categories',
                {
                  createdAt: new Date(),
                  name: casual.title,
                  listedByListId: listId,
                }
              ));
            }
          });
        })
    );

    return { successString: 'Yay check the db' };
  },
});
