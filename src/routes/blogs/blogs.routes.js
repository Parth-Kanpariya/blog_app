// eslint-disable-next-line no-func-assign

import { Router } from 'express';
import { appAuthMiddleware } from '../../middleware/authentication';
import { validate } from '../../validator/blogs.validator';
import { constants as VALIDATOR } from '../../constant/validator/blogs';
import * as blogsController from '../../controllers/blogs/blogs.controller';
const routes = new Router({ mergeParams: true });

const PATH = {
  CREATE_BLOG: '/',
  GET_BLOGS: '/',
  UPDATE_BLOG: '/:id',
  DELETE_BLOG: '/:id'
};

routes.use(appAuthMiddleware);
/**
 * @api {POST} /api/blogs/
 * @desc Blog create API
 * @access PRIVATE
 */
routes.post(PATH.CREATE_BLOG, validate(VALIDATOR.CREATE_BLOG), blogsController.createBlog);
/**
 * @api {GET} /api/blogs/
 * @desc Get all Blog of Authenticated user API
 * @access PRIVATE
 */
routes.get(PATH.GET_BLOGS, blogsController.getBlogs);
/**
 * @api {PUT} /api/blogs/:id
 * @desc Update Blog API
 * @access PRIVATE
 */
routes.put(PATH.UPDATE_BLOG, blogsController.updateBlog);
/**
 * @api {DELETE} /api/blogs/:id
 * @desc Delete Blog API
 * @access PRIVATE
 */
routes.delete(PATH.DELETE_BLOG, blogsController.deleteBlog);

export default routes;
