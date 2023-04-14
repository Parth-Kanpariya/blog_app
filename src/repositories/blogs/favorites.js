/* eslint-disable no-unused-vars */
import { logger, level } from '../../config/logger';
import favoriteModel from '../../models/favorites';

// create Favorite
export const createFavorite = async (userId, id) => {
  logger.log(level.info, '>> Create Favorite repo body');
  let data = {};

  const newFavorits = await favoriteModel.add({
    user_id: userId,
    blog_id: id
  });
  data = {
    error: false,
    message: 'Favorite Created!!',
    newFavorits
  };

  return data;
};
// get Favorite
export const getFavorites = async (query, userId) => {
  logger.log(level.info, `>> get Favorite repo`);
  const docLength = await favoriteModel.count({ user_id: userId });
  const favorits = await favoriteModel.aggregate(
    [
      {
        $match: {
          user_id: userId
        }
      },

      {
        $lookup: {
          from: 'blogs',
          localField: 'blog_id',
          foreignField: 'blog_id',
          as: 'blogs'
        }
      },
      {
        $unwind: '$blogs'
      },
      {
        $lookup:{
          from:'users',
          localField: 'user_id',
          foreignField: 'user_id',
          as: 'user'

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
  if (!favorits || favorits.length <= 0) {
    data = {
      error: true,
      message: 'No Favorite Found!!'
    };
    return data;
  }

  data = { error: false, message: 'succ_02', data: favorits, totalDocs: docLength };
  return data;
};

// delete blog
export const deleteFavorite = async (userId, blogId) => {
  logger.log(level.info, `>> Delete Favorite repo`);
  const favorits = await favoriteModel.get({
    blog_id: blogId,
    user_id: userId
  });
  let data = {};
  if (!favorits || favorits.length <= 0) {
    data = {
      error: true,
      message: 'No Favorite Found to delete!!'
    };
    return data;
  }
  await favoriteModel.delete({ user_id: userId, blog_id: blogId });

  data = {
    message: 'Favorite deleted!!'
  };
  return data;
};

// get Favorite
export const getFavoriteById = async (userId, id) => {
  logger.log(level.info, `>> get Favorite repo`);
  const favoriteExist = await favoriteModel.isExist({
    user_id: userId,
    blog_id: id
  });

  let data = {};
  if (!favoriteExist || favoriteExist.length <= 0) {
    data = {
      error: true,
      message: 'No Favorite Found!!',
      favorits: false
    };
    return data;
  }

  data = { error: false, message: 'succ_02', data: favoriteExist, favorits: true };
  return data;
};
