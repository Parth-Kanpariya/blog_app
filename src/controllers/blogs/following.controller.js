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

//create following
export const createFollowing = async (req, resp) => {
  logger.log(level.debug, '>>Create Likes');
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      return badRequestError(resp, errors);
    }

    const { user_id } = req.currentUser;
    const createdfollowing = await followingRepo.createFollowing(user_id, req.query.blogUserId);
    successResponseCreated(resp, createdfollowing);
  } catch (error) {
    logger.log(level.error, `Create Like error=${error}`);
    serverError(resp);
  }
};
// Get following
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
export const getMyFollowing = async (req, resp) => {
  logger.log(level.debug, '>>Get Likes');
  try {
    const { user_id } = req.currentUser;
    const following = await followingRepo.getMyFollowing(req.query, user_id);
    successResponse(resp, following);
  } catch (error) {
    logger.log(level.error, `Get Like error=${error}`);
    serverError(resp);
  }
};

//unfollow (delete following relationship)
export const unFollowUser = async (req, resp) => {
  logger.log(level.debug, '>>Delete Blog');
  try {
    const { user_id } = req.currentUser;
    const unFollow = await followingRepo.unFolloweUser(user_id, req.params.blogUserID);
    successResponse(resp, unFollow);
  } catch (error) {
    logger.log(level.error, `Delete Blog error=${error}`);
    serverError(resp);
  }
};
