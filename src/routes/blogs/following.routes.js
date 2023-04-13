// eslint-disable-next-line no-func-assign

import { Router } from 'express';
import { appAuthMiddleware } from '../../middleware/authentication';
import { validate } from '../../validator/followings.validator';
import { constants as VALIDATOR } from '../../constant/validator/followings';
import * as followingController from '../../controllers/blogs/following.controller';
const routes = new Router({ mergeParams: true });

const PATH = {
  CREATE_FOLLOWING: '/',
  GET_FOLLOWINGS: '/:blogUserID',
  UNFOLLOW: '/:blogUserID',
  GET_MY_FOLLOWING: '/'
};

routes.use(appAuthMiddleware);
/**
 * @api {POST} /api/followings/
 * @desc Followings create API
 * @access PRIVATE
 */
routes.post(PATH.CREATE_FOLLOWING,validate(VALIDATOR.CREATE_FOLLOWING), followingController.createFollowing);
/**
 * @api {GET} /api/followings/:blogUserID
 * @desc Get following
 * @access PRIVATE
 */
routes.get(PATH.GET_FOLLOWINGS,validate(VALIDATOR.GET_FOLLOWING), followingController.getFollowing);
/**
 * @api {GET} /api/followings/:blogUserID
 * @desc GET my followings API
 * @access PRIVATE
 */
routes.get(PATH.GET_MY_FOLLOWING, validate(VALIDATOR.GET_MY_FOLLOWING),followingController.getMyFollowing);

/**
 * @api {DELETE} /api/followings/:id
 * @desc Unfollow API
 * @access PRIVATE
 */
routes.delete(PATH.UNFOLLOW, validate(VALIDATOR.UNFOLLOW_SERVICE),followingController.unFollowUser);

export default routes;
