// eslint-disable-next-line no-func-assign

import { Router } from 'express';
import { appAuthMiddleware } from '../../middleware/authentication';
// import { validate } from '../../validator/likes.validator';
// import { constants as VALIDATOR } from '../../constant/validator/likes';
import * as favoriteController from '../../controllers/blogs/favorites.controller';
const routes = new Router({ mergeParams: true });

const PATH = {
  CREATE_FAVORITES: '/:id',
  GET_FAVORITES: '/',
  DELETE_FAVORITE: '/:id',
  GET_FAVORITE: '/:id'
};

routes.use(appAuthMiddleware);
/**
 * @api {POST} /api/favorites/
 * @desc Favorite create API
 * @access PRIVATE
 */
routes.post(PATH.CREATE_FAVORITES, favoriteController.createFavorite);
/**
 * @api {GET} /api/favorites/
 * @desc Get all Favorite of Blog
 * @access PRIVATE
 */
routes.get(PATH.GET_FAVORITES, favoriteController.getFavorites);
/**
 * @api {GET} /api/favorites/:id
 * @desc GET Favorite API
 * @access PRIVATE
 */
routes.get(PATH.GET_FAVORITE, favoriteController.getFavoriteById);
// /**
//  * @api {PUT} /api/favorites/:id
//  * @desc Update Favorite API
//  * @access PRIVATE
//  */
// routes.put(PATH.UPDATE_LIKE, likesController.updateDelete);
/**
 * @api {DELETE} /api/favorites/:id
 * @desc Delete Favorite API
 * @access PRIVATE
 */
routes.delete(PATH.DELETE_FAVORITE, favoriteController.deleteFavorite);

export default routes;
