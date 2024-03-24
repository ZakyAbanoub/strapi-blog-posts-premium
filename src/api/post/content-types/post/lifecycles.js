module.exports = {
  beforeCreate: async ({ params }) => {
    console.log({ params });
    // Find the admin user who is about to create the post
    const adminUserId = params.data.createdBy;

    // find the corresponding Author
    const author = (
      await strapi.entityService.findMany("api::author.author", {
        filters: {
          admin_user: [adminUserId],
        },
      })
    )[0];

    // Update the data payload of the request for creating the new post by adding the author to the "authors" relation field.
    console.log(params.data.authors);
    params.data.authors.connect = [...params.data.authors.connect, author.id];
  },
};
