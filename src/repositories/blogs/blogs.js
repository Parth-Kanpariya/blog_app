/* eslint-disable no-unused-vars */
import { logger, level } from '../../config/logger';
import blogModel from '../../models/blogs';
import likeModel from '../../models/likes';
import commentModel from '../../models/comments';
import { constants as APP_CONST } from '../../constant/application';

// create blog
export const createBlog = async (body, req, userId) => {
  logger.log(level.info, `>> Create Job repo body=${JSON.stringify(body)}`);
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
  const file = req.files.image;

  file.mv(`${APP_CONST.BLOG_PATH}/${file.name}`, (err) => {
    if (err) {
      throw new Error(err);
    }
  });
  const imageUrl = `http://localhost:3000/static/${file.name}`;
  const tagsList = body.tags.split(',');
  body.tags = tagsList;
  const newblog = await blogModel.add({
    ...body,
    description: body.description.toLowerCase(),
    user_id: userId,
    image: imageUrl
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

//get searched blogs
export const getSearchBlog = async (query) => {
  logger.log(level.info, `>> get search blog repo`);

  // const docLength = await blogModel.count({ user_id: userId });
  const blogs = await blogModel.aggregate(
    [
      {
        $match: {
          $or: [
            { title: { $regex: new RegExp(query.toLowerCase(), 'i') } },
            { category: { $regex: new RegExp(query.toLowerCase(), 'i') } },
            { tags: { $in: [query.toLowerCase()] } }
          ]
        }
      },
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

  let data = {};
  if (!blogs || blogs.length <= 0) {
    data = {
      error: true,
      message: 'No blogs Found!!'
    };
    return data;
  }

  data = { error: false, message: 'succ_02', data: blogs };
  return data;
};
// update blog
export const updateBlog = async (body, userId, blogId, req) => {
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
  let imageUrl = '';
  if (req.files) {
    const file = req.files.image;

    file.mv(`${APP_CONST.BLOG_PATH}/${file.name}`, (err) => {
      if (err) {
        throw new Error(err);
      }
    });
    imageUrl = `http://localhost:3000/static/${file.name}`;
  }

  const tagsList = body.tags.split(',');
  body.tags = tagsList;

  // console.log(imageUrl);
  if (imageUrl === '') {
    body.image = blogs.image;
  } else {
    body.image = imageUrl;
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
  await likeModel.delete({ blog_id: blogId });
  await commentModel.delete({ blog_id: blogId });

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
