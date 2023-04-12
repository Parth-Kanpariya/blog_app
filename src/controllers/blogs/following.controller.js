// eslint-disable-next-line no-func-assign

import { logger, level } from '../../config/logger';
import {
  serverError,
  successResponse,
  successResponseCreated,
  badRequestError
} from '../../utils/utility';
import { validationResult } from 'express-validator';
import * as followingRepo from '../../repositories/blogs/following';
// import { constants as APP_CONST } from '../../constant/application';

export const createFollowing = async (req, resp) => {
  logger.log(level.debug, '>>Create Likes');
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      return badRequestError(resp, errors);
    }

    const { user_id } = req.currentUser;
    console.log(req.query);
    const createdfollowing = await followingRepo.createFollowing(user_id, req.query.blogUserId);
    successResponseCreated(resp, createdfollowing);
  } catch (error) {
    logger.log(level.error, `Create Like error=${error}`);
    serverError(resp);
  }
};
// Get Blog
export const getFollowing = async (req, resp) => {
  logger.log(level.debug, '>>Get Likes');
  try {
    const { user_id } = req.currentUser;
    const following = await followingRepo.getFollowing(req.query, user_id, req.params.blogUserID);
    successResponse(resp, following);
  } catch (error) {
    logger.log(level.error, `Get Like error=${error}`);
    serverError(resp);
  }
};