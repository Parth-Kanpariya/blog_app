// eslint-disable-next-line no-func-assign

import { Router } from 'express';
import { appAuthMiddleware } from '../../middleware/authentication';
import { validate } from '../../validator/comments.validator';
import { constants as VALIDATOR } from '../../constant/validator/comments';
import * as commentsController from '../../controllers/blogs/comments.controller';
const routes = new Router({ mergeParams: true });

const PATH = {
  CREATE_COMMENT: '/',
  GET_COMMENTS: '/:blogId',
  DELETE_COMMENT: '/:id',
  UPDATE_COMMENT: '/:id'
};

routes.use(appAuthMiddleware);
/**
 * @api {POST} /api/comments/
 * @desc Blog create API
 * @access PRIVATE
 */
routes.post(
  PATH.CREATE_COMMENT,
  validate(VALIDATOR.CREATE_COMMENT),
  commentsController.createComment
);
/**
 * @api {GET} /api/comments/:blogId
 * @desc Get all Blog of Authenticated user API
 * @access PRIVATE
 */
routes.get(PATH.GET_COMMENTS, validate(VALIDATOR.GET_COMMENTS), commentsController.getComments);
// /**
//  * @api {GET} /api/comments/:id
//  * @desc GET comments API
//  * @access PRIVATE
//  */
// routes.get(PATH.GET_BLOG, commentsController.getCommentById);
// /**
//  * @api {PUT} /api/comments/:id
//  * @desc Update comments API
//  * @access PRIVATE
//  */
// routes.put(PATH.UPDATE_COMMENT, commentsController.updateComment);
// /**
//  * @api {DELETE} /api/comments/:id
//  * @desc Delete comments API
//  * @access PRIVATE
//  */
// routes.delete(PATH.DELETE_COMMENT, commentsController.deleteComment);

export default routes;
