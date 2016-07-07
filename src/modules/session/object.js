import uuid from 'uuid-js';

export default {
  name: 'Session',
  fields: {
    id: obj => {
      if (obj.id) {
        return obj.id;
      }

      const id = uuid.create().hex;
      return { ...obj, id };
    },
    currentUser: (obj, args, context) => (
      obj.currentUserID && context.db.findBy('users', { id: obj.currentUserID })
    ),
  },
};
