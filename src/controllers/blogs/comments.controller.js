// eslint-disable-next-line no-func-assign

import { logger, level } from '../../config/logger';
import {
  serverError,
  successResponse,
  successResponseCreated,
  badRequestError
} from '../../utils/utility';
import { validationResult } from 'express-validator';
import * as commentsRepo from '../../repositories/blogs/comments';

//create comment
export const createComment = async (req, resp) => {
  logger.log(level.debug, '>>Create Comments');
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      return badRequestError(resp, errors);
    }

    const { user_id } = req.currentUser;
    const createdComment = await commentsRepo.createComment(req.body, user_id);
    successResponseCreated(resp, createdComment);
  } catch (error) {
    logger.log(level.error, `Create Commnet error=${error}`);
    serverError(resp);
  }
};
// Get comment
export const getComments = async (req, resp) => {
  logger.log(level.debug, '>>Get Commnets');
  try {
    // const { user_id } = req.currentUser;
    const comments = await commentsRepo.getComments(req.query, req.params.blogId);
    successResponse(resp, comments);
  } catch (error) {
    logger.log(level.error, `Get Commnet error=${error}`);
    serverError(resp);
  }
};
