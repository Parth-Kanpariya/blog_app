/* eslint-disable no-unused-vars */
import { logger, level } from '../../config/logger';
import blogModel from '../../models/blogs';

// create blog
export const createBlog = async (body, imageUrl, userId) => {
  logger.log(level.info, `>> Create Blog repo body=${JSON.stringify(body)}`);
  let data = {};
  // const blogExist = await blogModel.isExist({
  //   ...body,
  //   description: body.body.toLowerCase(),
  //   user_id: userId
  // });
  // if (blogExist) {
  //   data = {
  //     error: true,
  //     message: 'blog Already exist!'
  //   };
  //   return data;
  // }
  const tagsList = body.tags.split(' ');
  const newblog = await blogModel.add({
    ...body,
    description: body.description.toLowerCase(),
    user_id: userId,
    image: imageUrl,
    tags: tagsList
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
  const blogs = await blogModel.aggregate(
    [
      // {
      //   $match: {
      //     user_id: userId
      //   }
      // },
      {
        $lookup: {
          from: 'users',
          localField: 'user_id',
          foreignField: 'user_id',
          as: 'user'
        }
      },
      {
        $sort: {
          created_at: -1
        }
      }
    ],
    null,
    {
      page: +query.page,
      limit: +query.limit
    }
  );
  // const blogs = await blogModel.get({ user_id: userId }, null, {
  //   sort: { created_at: 'desc' },
  //   page: +query.page,
  //   limit: +query.limit
  // });
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

export const updateBlog = async (body, userId, blogId, imageUrl) => {
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
  if (imageUrl !== '') {
    body.image = imageUrl;
  } else {
    body.image = blogs[0].image;
  }
  const tagsList = body.tags.split(' ');
  body.tags = tagsList;
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

// get blog
export const getBlogById = async (id) => {
  logger.log(level.info, `>> get blog repo`);
  console.log('++++');
  const blog = await blogModel.aggregate([
    {
      $match: {
        blog_id: id
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'user_id',
        foreignField: 'user_id',
        as: 'user'
      }
    }
  ]);
  // const blogs = await blogModel.get({ user_id: userId }, null, {
  //   sort: { created_at: 'desc' },
  //   page: +query.page,
  //   limit: +query.limit
  // });
  let data = {};
  if (!blog || blog.length <= 0) {
    data = {
      error: true,
      message: 'No blogs Found!!'
    };
    return data;
  }

  data = { error: false, message: 'succ_02', data: blog };
  return data;
};
