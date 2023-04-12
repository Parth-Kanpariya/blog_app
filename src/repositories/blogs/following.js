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
