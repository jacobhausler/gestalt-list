import uuid from 'uuid-js';

export default methods => ({
  insert: (table, record) => ({
    id: uuid.create().hex,
    ...record,
  }),
  update: (table, { id }, attrs) => [{
    id,
    ...attrs,
  }],
  deleteBy: () => true,
  ...methods,
});
