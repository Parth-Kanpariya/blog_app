/* eslint-disable no-unused-vars */
import { logger, level } from '../../config/logger';
import blogModel from '../../models/blogs';

// create blog
export const createBlog = async (body, userId) => {
  logger.log(level.info, `>> Create Job repo body=${JSON.stringify(body)}`);
  let data = {};
  const blogExist = await blogModel.isExist({
    ...body,
    description: body.description.toLowerCase(),
    user_id: userId
  });
  if (blogExist) {
    data = {
      error: true,
      message: 'blog Already exist!'
    };
    return data;
  }

  const newblog = await blogModel.add({
    ...body,
    description: body.description.toLowerCase(),
    user_id: userId
  });
  data = {
    error: false,
    message: 'Blog Created!!',
    newblog
  };

  return data;
};
// get blog
export const getBlogs = async (query, userId) => {
  logger.log(level.info, `>> get blog repo`);
  const docLength = await blogModel.count({ user_id: userId });
  const blogs = await blogModel.get({ user_id: userId }, null, {
    sort: { created_at: 'desc' },
    page: +query.page,
    limit: +query.limit
  });
  let data = {};
  if (!blogs || blogs.length <= 0) {
    data = {
      error: true,
      message: 'No blogs Found!!'
    };
    return data;
  }

  data = { error: false, message: 'succ_02', data: blogs, totalDocs: docLength };
  return data;
};
// update blog

export const updateBlog = async (body, userId, blogId) => {
  logger.log(level.info, `>> update blog repo`);
  const blogs = await blogModel.get({
    blog_id: blogId,
    user_id: userId
  });
  let data = {};
  if (!blogs || blogs.length <= 0) {
    data = {
      error: true,
      message: 'No blog Found!!'
    };
    return data;
  }
  const updatedblog = await blogModel.update(
    {
      user_id: userId,
      blog_id: blogId
    },
    body,
    {
      new: true,
      runValidators: true
    }
  );

  data = {
    error: false,
    message: 'blog updated!',
    data: updatedblog
  };
  return data;
};

// delete blog
export const deleteBlog = async (userId, blogId) => {
  logger.log(level.info, `>> Delete blog repo`);
  const blogs = await blogModel.get({
    blog_id: blogId,
    user_id: userId
  });
  let data = {};
  if (!blogs || blogs.length <= 0) {
    data = {
      error: true,
      message: 'No blog Found to delete!!'
    };
    return data;
  }
  await blogModel.delete({ user_id: userId, blog_id: blogId });

  data = {
    message: 'blog deleted!!'
  };
  return data;
};

// delete cheked blogs
export const deletedCheckedBlogs = async (userId, body) => {
  logger.log(level.info, `>> Delete blog repo`);
  const blogs = await blogModel.get({
    user_id: userId
  });
  let data = {};
  if (!blogs || blogs.length <= 0) {
    data = {
      error: true,
      message: 'No blog Found to delete!!'
    };
    return data;
  }
  // await blogModel.deleteMultiple({ user_id: userId });
  console.log(body);
  await blogModel.deleteMultiple({
    blog_id: {
      $in: body.blogs
    }
  });

  data = {
    message: 'blog deleted!!'
  };
  return data;
};
