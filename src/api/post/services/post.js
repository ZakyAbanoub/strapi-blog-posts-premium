"use strict";

/**
 * post service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::post.post", ({ strapi }) => ({
  async findPublic(args) {
    const newQuery = {
      ...args,
      filters: {
        ...args.filters,
        premium: false,
      },
    };
    console.log(newQuery);
    const publicPosts = await strapi.entityService.findMany(
      "api::post.post",
      this.getFetchParams(newQuery)
    );
    return publicPosts;
  },
  async findOneIsPublic(args) {
    const { id, query } = args;

    const singlePost = await strapi.entityService.findOne(
      "api::post.post",
      id,
      this.getFetchParams(query)
    );

    if (!singlePost.premium) {
      return singlePost;
    }
    return null;
  },

  async likePost(args) {
    const { postId, userId, query } = args;

    // use the underluing entity service API to fetch the post and likedBy property
    const postToLike = await strapi.entityService.findOne(
      "api::post.post",
      postId,
      {
        populate: ["likedBy"],
      }
    );
    console.log({ postToLike });
    //user the underlying entity service API to update the current post with the new relation.
    const updatedPost = await strapi.entityService.update(
      "api::post.post",
      postId,
      {
        data: {
          likedBy: [...postToLike.likedBy, userId],
        },
        ...query,
      }
    );
    return updatedPost;
  },
}));
