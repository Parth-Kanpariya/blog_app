// eslint-disable-next-line no-func-assign

import { logger, level } from '../../config/logger';
import {
  serverError,
  successResponse,
  successResponseCreated,
  badRequestError
} from '../../utils/utility';
import { validationResult } from 'express-validator';
import * as likeRepo from '../../repositories/blogs/likes';

export const createLike = async (req, resp) => {
  logger.log(level.debug, '>>Create Likes');
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      return badRequestError(resp, errors);
    }

    const { user_id } = req.currentUser;
    const createdLike = await likeRepo.createLike(req.body, user_id);
    successResponseCreated(resp, createdLike);
  } catch (error) {
    logger.log(level.error, `Create Like error=${error}`);
    serverError(resp);
  }
};
// Get Blog
export const getLikes = async (req, resp) => {
  logger.log(level.debug, '>>Get Likes');
  try {
    const { user_id } = req.currentUser;
    const likes = await likeRepo.getLikes(req.query, user_id, req.params.blogId);
    successResponse(resp, likes);
  } catch (error) {
    logger.log(level.error, `Get Like error=${error}`);
    serverError(resp);
  }
};
