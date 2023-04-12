/* eslint-disable no-unused-vars */
import { logger, level } from '../../config/logger';
import likeModel from '../../models/likes';
import blogModel from '../../models/blogs';

// create blog
export const createLike = async (body, userId) => {
  logger.log(level.info, `>> Create Like repo body=${JSON.stringify(body)}`);
  let data = {};

  const newComment = await likeModel.add({
    ...body,
    user_id: userId
  });
  data = {
    error: false,
    message: 'like Created!!',
    newComment
  };

  return data;
};
// get blog
export const getLikes = async (query, userId, blogId) => {
  logger.log(level.info, `>> get like repo`);
  const docLength = await likeModel.count({ blog_id: blogId });
  const likes = await blogModel.aggregate(
    [
      {
        $match: {
          blog_id: blogId
        }
      },
      // {
      //   $lookup: {
      //     from: 'likes',
      //     localField: 'blog_id',
      //     foreignField: 'blog_id',
      //     as: 'likes'
      //   }
      // },
      // {
      //   $addFields: {
      //     numberOfLikes: { $size: '$likes' }
      //   }
      // }

      {
        $lookup: {
          from: 'likes',
          localField: 'blog_id',
          foreignField: 'blog_id',
          as: 'likes'
        }
      },
      {
        $lookup: {
          from: 'likes',
          let: { postId: '$blog_id', userId: userId },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ['$blog_id', '$$postId'] }, { $eq: ['$user_id', '$$userId'] }]
                }
              }
            }
          ],
          as: 'userLike'
        }
      },
      {
        $addFields: {
          numberOfLikes: { $size: '$likes' },
          userLiked: { $cond: [{ $size: '$userLike' }, true, false] }
        }
      },
      {
        $project: {
          userLike: 0
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
  if (!likes || likes.length <= 0) {
    data = {
      error: true,
      message: 'No comments Found!!'
    };
    return data;
  }

  data = { error: false, message: 'succ_02', data: likes, totalDocs: docLength };
  return data;
};
