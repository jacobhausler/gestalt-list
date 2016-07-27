
export default {
  name: 'Post',
  fields: {
    stars: async ({ id }, args, { db }) => {
      const star = await db.queryBy('user_starred_posts', {
        starredPostId: id,
      });

      const stars = star.length;

      console.log(star);

      return stars;
    },
  },
};
