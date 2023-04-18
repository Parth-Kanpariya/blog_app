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
  DELETE_BLOG: '/:id',
  GET_BLOG: '/:id',
  GET_FILTERED_BLOGS: '/search/:id'
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
routes.get(PATH.GET_BLOGS, validate(VALIDATOR.GET_BLOGS), blogsController.getBlogs);
/**
 * @api {GET} /api/blogs/:id
 * @desc GET Blog API
 * @access PRIVATE
 */
routes.get(PATH.GET_BLOG, validate(VALIDATOR.GET_BLOG), blogsController.getBlogById);
/**
 * @api {GET} /api/blogs/search?search=""
 * @desc GET Blog API
 * @access PRIVATE
 */
routes.get(PATH.GET_FILTERED_BLOGS, blogsController.getSearchBlogs);
/**
 * @api {PUT} /api/blogs/:id
 * @desc Update Blog API
 * @access PRIVATE
 */
routes.put(PATH.UPDATE_BLOG, validate(VALIDATOR.UPDATE_BLOG), blogsController.updateBlog);
/**
 * @api {DELETE} /api/blogs/:id
 * @desc Delete Blog API
 * @access PRIVATE
 */
routes.delete(PATH.DELETE_BLOG, validate(VALIDATOR.DELETE_BLOG), blogsController.deleteBlog);

export default routes;
