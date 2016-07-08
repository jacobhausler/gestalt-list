import uuid from 'uuid-js';

export default {
  insert: (_, record) => ({
    id: uuid.create().hex,
    ...record,
  }),
};
