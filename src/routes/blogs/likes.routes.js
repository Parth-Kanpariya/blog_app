// eslint-disable-next-line no-func-assign

import { Router } from 'express';
import { appAuthMiddleware } from '../../middleware/authentication';
import { validate } from '../../validator/likes.validator';
import { constants as VALIDATOR } from '../../constant/validator/likes';
import * as likesController from '../../controllers/blogs/likes.controller';
const routes = new Router({ mergeParams: true });

const PATH = {
  CREATE_LIKES: '/',
  GET_LIKES: '/:blogId',
  DELETE_LIKE: '/:id',
  UPDATE_LIKE: '/:id'
};

routes.use(appAuthMiddleware);
/**
 * @api {POST} /api/likes/
 * @desc Like create API
 * @access PRIVATE
 */
routes.post(PATH.CREATE_LIKES, validate(VALIDATOR.CREATE_LIKE), likesController.createLike);
/**
 * @api {GET} /api/likes/
 * @desc Get all Like of Blog
 * @access PRIVATE
 */
routes.get(PATH.GET_LIKES, validate(VALIDATOR.GET_LIKES), likesController.getLikes);
// /**
//  * @api {GET} /api/likes/:id
//  * @desc GET Like API
//  * @access PRIVATE
//  */
// routes.get(PATH.GET_BLOG, blogsController.getLikeById);
// /**
//  * @api {PUT} /api/likes/:id
//  * @desc Update Like API
//  * @access PRIVATE
//  */
// routes.put(PATH.UPDATE_LIKE, likesController.updateDelete);
// /**
//  * @api {DELETE} /api/likes/:id
//  * @desc Delete Like API
//  * @access PRIVATE
//  */
// routes.delete(PATH.DELETE_LIKE, likesController.deleteDelete);

export default routes;
