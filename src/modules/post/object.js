
export default {
  name: 'Post',
  fields: {
    stars: async ({ id }, args, { db }) => {
      const star = await db.queryBy('user_starred_posts', {
        starredPostId: id,
      });

      return { starCount: star.length };
    },
  },
};
