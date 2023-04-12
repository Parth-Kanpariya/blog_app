// eslint-disable-next-line no-func-assign

import { Router } from 'express';
import { appAuthMiddleware } from '../../middleware/authentication';
// import { validate } from '../../validator/blogs.validator';
// import { constants as VALIDATOR } from '../../constant/validator/blogs';
import * as followingController from '../../controllers/blogs/following.controller';
const routes = new Router({ mergeParams: true });
// fileFilter: (req, file, cb) => {
//   if (
//     file.mimetype == 'image/png' ||
//     file.mimetype == 'image/jpg' ||
//     file.mimetype == 'image/jpeg'
//   ) {
//     console.log('++++++++++++');
//     cb(null, true);
//   } else {
//     cb(null, false);
//     return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
//   }
// }

const PATH = {
  CREATE_FOLLOWING: '/',
  GET_FOLLOWINGS: '/:blogUserID'
};

routes.use(appAuthMiddleware);
/**
 * @api {POST} /api/blogs/
 * @desc Blog create API
 * @access PRIVATE
 */
routes.post(PATH.CREATE_FOLLOWING, followingController.createFollowing);
/**
 * @api {GET} /api/blogs/
 * @desc Get all Blog of Authenticated user API
 * @access PRIVATE
 */
routes.get(PATH.GET_FOLLOWINGS, followingController.getFollowing);
/**
 * @api {GET} /api/blogs/:id
 * @desc GET Blog API
 * @access PRIVATE
 */
// routes.get(PATH.GET_BLOG, blogsController.getBlogById);
// /**
//  * @api {PUT} /api/blogs/:id
//  * @desc Update Blog API
//  * @access PRIVATE
//  */
// routes.put(PATH.UPDATE_BLOG, blogsController.updateBlog);
// /**
//  * @api {DELETE} /api/blogs/:id
//  * @desc Delete Blog API
//  * @access PRIVATE
//  */
// routes.delete(PATH.DELETE_BLOG, blogsController.deleteBlog);

export default routes;
