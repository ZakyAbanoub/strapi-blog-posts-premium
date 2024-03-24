"use strict";

const post = require("../routes/post");

/**
 * post controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::post.post", ({ strapi }) => ({
  //First Solution, non optimal because now we get all posts (ex: 300) to send to user not authenticated only the not premium.
  // async find(ctx) {
  //   //Fetch all posts
  //   const { data, meta } = await super.find(ctx);
  //   //Check user
  //   if (ctx.state.user) return { data, meta };
  //   //If user is not authenticated
  //   const filteredData = data.filter(
  //     (post) => post.attributes.premium === false
  //   );
  //   return { data: filteredData, meta };
  // },

  //Second Solution, rewrite the action to fetch only needed posts.
  // async find(ctx) {
  //   //PART 1:
  //   // If the user is authenticated
  //   // If the user filter the premium posts
  //   const isRequestingNonPremium =
  //     ctx.query.filters && ctx.request.query.filters.premium["$eq"] == "false";
  //   console.log({ isRequestingNonPremium });
  //   if (ctx.state.user || isRequestingNonPremium) return await super.find(ctx);

  //   //PART 2: If the user is not autenticated
  //   //Call the underlying service with an additional filter param: premium == false;
  //   // /posts?filters[premium]=false
  //   const { query } = ctx;
  //   const filteredPosts = await strapi.service("api::post.post").find({
  //     ...query,
  //     filters: {
  //       ...query.filters,
  //       premium: false,
  //     },
  //   });
  //   const sanitizedPosts = await this.sanitizeOutput(filteredPosts, ctx);
  //   return this.transformResponse(sanitizedPosts);
  // },

  //Third Solution, the best to create a custom service.
  async find(ctx) {
    //   //PART 1:
    //   // If the user is authenticated
    //   // If the user filter the premium posts
    const isRequestingNonPremium =
      ctx.query.filters && ctx.request.query.filters.premium["$eq"] == "false";
    console.log({ isRequestingNonPremium });
    if (ctx.state.user || isRequestingNonPremium) return await super.find(ctx);

    //   //PART 2: If the user is not autenticated
    const publicPosts = await strapi
      .service("api::post.post")
      .findPublic(ctx.query);

    const sanitizedPosts = await this.sanitizeOutput(publicPosts, ctx);
    return this.transformResponse(sanitizedPosts);
  },

  async findOne(ctx) {
    if (ctx.state.user) return await super.findOne(ctx);

    const { id } = ctx.params; //Posts/:id
    const { query } = ctx;

    const isPostPublic = await strapi
      .service("api::post.post")
      .findOneIsPublic({
        id,
        query,
      });

    const sanitizedEntity = await this.sanitizeOutput(isPostPublic, ctx);
    return this.transformResponse(sanitizedEntity);
  },

  async likePost(ctx) {
    // ctx.state.user is true
    const user = ctx.state.user; //user trying to like the post
    const postId = ctx.params.id; // post id
    const { query } = ctx;

    const updatedPost = await strapi.service("api::post.post").likePost({
      postId,
      userId: user.id,
      query,
    });
    const sanitizedEntity = await this.sanitizeOutput(updatedPost, ctx);
    return this.transformResponse(sanitizedEntity);
  },
}));
