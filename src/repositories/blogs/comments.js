/* eslint-disable no-unused-vars */
import { logger, level } from '../../config/logger';
import commentModel from '../../models/comments';
import blogModel from '../../models/blogs';
// create blog
export const createComment = async (body, userId) => {
  logger.log(level.info, `>> Create Comment repo body=${JSON.stringify(body)}`);
  let data = {};

  const newComment = await commentModel.add({
    ...body,
    user_id: userId
  });
  data = {
    error: false,
    message: 'comments Created!!',
    newComment
  };

  return data;
};
// get blog
export const getComments = async (query, blogId) => {
  logger.log(level.info, `>> get Commet repo ${blogId}`);
  const docLength = await commentModel.count({ blog_Id: blogId });
  const comments = await blogModel.aggregate(
    [
      {
        $match: {
          blog_id: blogId
        }
      },
      {
        $lookup: {
          from: 'comments',
          localField: 'blog_id',
          foreignField: 'blog_id',
          as: 'comments'
        }
      },
      {
        $unwind: '$comments'
      },
      {
        $lookup: {
          from: 'users',
          localField: 'comments.user_id',
          foreignField: 'user_id',
          as: 'comments.user'
        }
      },
      {
        $group: {
          _id: '$_id',
          title: { $first: '$title' },
          content: { $first: '$content' },
          user: { $first: '$user' },
          comments: { $push: '$comments' }
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
  if (!comments || comments.length <= 0) {
    data = {
      error: true,
      message: 'No comments Found!!'
    };
    return data;
  }

  data = { error: false, message: 'succ_02', data: comments, totalDocs: docLength };
  return data;
};
