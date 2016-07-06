import uuid from 'uuid';

export default {
  name: 'Session',
  fields: {
    id: obj => {
      if (obj.id) {
        return obj.id;
      }

      const id = uuid.v1().hex;
      return { ...obj, id };
    },
    currentUser: (obj, args, context) => (
      obj.currentUserID && context.db.findBy('users', { id: obj.currentUserID })
    ),
  },
};
