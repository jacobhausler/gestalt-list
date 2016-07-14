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
      db.insert('Locations', {
        createdAt: new Date(),
        name: casual.city,
      }).then(location =>
        times(8, () =>
          db.insert('Lists', {
            createdAt: new Date(),
            name: casual.title,
            ownedByLocationId: location.id,
          }).then(list =>
            times(casual.integer(4, 12), () =>
              db.insert('Categories', {
                createdAt: new Date(),
                name: casual.title,
                listedByListId: list.id,
              })
            )
          )
        )
      )
    );
    return { successString: 'Yay check the db' };
  },
});
