// eslint-disable-next-line no-func-assign

import { logger, level } from '../../config/logger';
import {
  serverError,
  successResponse,
  successResponseCreated,
  badRequestError
} from '../../utils/utility';
import { validationResult } from 'express-validator';
import * as favoriteRepo from '../../repositories/blogs/favorites';

export const createFavorite = async (req, resp) => {
  logger.log(level.debug, '>>Create Favorite');
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      return badRequestError(resp, errors);
    }

    const { user_id } = req.currentUser;
    const createdFavorite = await favoriteRepo.createFavorite(user_id, req.params.id);
    successResponseCreated(resp, createdFavorite);
  } catch (error) {
    logger.log(level.error, `Create Favorite error=${error}`);
    serverError(resp);
  }
};
// Get favorite
export const getFavorites = async (req, resp) => {
  logger.log(level.debug, '>>Get Favorite');
  try {
    const { user_id } = req.currentUser;
    const favorites = await favoriteRepo.getFavorites(req.query, user_id);
    successResponse(resp, favorites);
  } catch (error) {
    logger.log(level.error, `Get Favorite error=${error}`);
    serverError(resp);
  }
};
// Get favorite by id
export const getFavoriteById = async (req, resp) => {
  logger.log(level.debug, '>>Get Favorite');
  try {
    const { user_id } = req.currentUser;
    const favorites = await favoriteRepo.getFavoriteById(user_id,req.params.id);
    successResponse(resp, favorites);
  } catch (error) {
    logger.log(level.error, `Get Favorite error=${error}`);
    serverError(resp);
  }
};

// Delete Favorite
export const deleteFavorite = async (req, resp) => {
  logger.log(level.debug, '>>Delete Favorite');
  try {
    const { user_id } = req.currentUser;
    const deletedFavorite = await favoriteRepo.deleteFavorite(user_id, req.params.id);
    successResponse(resp, deletedFavorite);
  } catch (error) {
    logger.log(level.error, `Delete Favorite error=${error}`);
    serverError(resp);
  }
};
