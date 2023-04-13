/* eslint-disable no-unused-vars */
import { logger, level } from '../../config/logger';
import userModel from '../../models/user';
import followingModel from '../../models/following';

// create blog
export const createFollowing = async (userId, blogUserId) => {
  logger.log(level.info, `>> Create Like repo body=${JSON.stringify()}`);
  let data = {};
  console.log(blogUserId, '--------------------------');
  const newFollowing = await followingModel.add({
    user_id: blogUserId,
    follower_id: userId
  });
  data = {
    error: false,
    message: 'following Created!!',
    newFollowing
  };

  return data;
};
// get blog
export const getFollowing = async (query, userId, blogUserId) => {
  logger.log(level.info, `>> get like repo`);
  const docLength = await followingModel.count();
  console.log(userId);
  console.log(blogUserId);
  const followings = await userModel.aggregate(
    [
      {
        $match: {
          user_id: userId
        }
      },
      {
        $lookup: {
          from: 'followings',
          localField: 'user_id',
          foreignField: 'follower_id',
          as: 'following'
        }
      },
      {
        $match: {
          'following.user_id': blogUserId
        }
      },
      {
        $project: {
          is_following: {
            $cond: {
              if: { $gt: [{ $size: '$following' }, 0] },
              then: true,
              else: false
            }
          }
        }
      }
    ],
    null,
    {
      page: +query.page,
      limit: +query.limit
    }
  );
  console.log(followings);
  let data = {};
  if (!followings || followings.length <= 0) {
    data = {
      error: true,
      message: 'No followings Found!!'
    };
    return data;
  }

  data = { error: false, message: 'succ_02', data: followings, totalDocs: docLength };
  return data;
};

// get blog
export const getMyFollowing = async (query, userId) => {
  logger.log(level.info, `>> get like repo`);
  const docLength = await followingModel.count();
  console.log(userId);
  const followings = await userModel.aggregate(
    [
      {
        $match: {
          user_id: userId
        }
      },
      {
        $lookup: {
          from: 'followings',
          localField: 'user_id',
          foreignField: 'follower_id',
          as: 'following'
        }
      },
      {
        $unwind: '$following'
      },
      {
        $lookup: {
          from: 'users',
          localField: 'following.user_id',
          foreignField: 'user_id',
          as: 'following_user'
        }
      },
      {
        $unwind: '$following_user'
      },
      {
        $project: {
          following_user: 1
        }
      }
    ],
    null,
    {
      page: +query.page,
      limit: +query.limit
    }
  );
  console.log(followings);
  let data = {};
  if (!followings || followings.length <= 0) {
    data = {
      error: true,
      message: 'No followings Found!!'
    };
    return data;
  }

  data = { error: false, message: 'succ_02', data: followings, totalDocs: docLength };
  return data;
};

export const unFolloweUser = async (userId, blogId) => {
  logger.log(level.info, `>> Delete blog repo`);
  const blogs = await followingModel.get({
    user_id: blogId,
    follower_id: userId
  });
  let data = {};
  if (!blogs || blogs.length <= 0) {
    data = {
      error: true,
      message: 'No blog Found to delete!!'
    };
    return data;
  }
  await followingModel.delete({ follower_id: userId, user_id: blogId });

  data = {
    message: 'blog deleted!!'
  };
  return data;
};
