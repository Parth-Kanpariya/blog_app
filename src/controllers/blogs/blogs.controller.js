// eslint-disable-next-line no-func-assign

import { logger, level } from '../../config/logger';
import {
  serverError,
  successResponse,
  successResponseCreated,
  badRequestError
} from '../../utils/utility';
import { validationResult } from 'express-validator';
import * as blogRepo from '../../repositories/blogs/blogs';
// const path = require('path');

// const rootDir = path.dirname(process.mainModule.filename);

// Create Blog
export const createBlog = async (req, resp) => {
  logger.log(level.debug, '>>Create Blog');
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      return badRequestError(resp, errors);
    }
    // if (!req.files || Object.keys(req.files).length === 0) {
    //   return resp.status(400).send('No files were uploaded.');
    // }
    const file = req.files.image;

    file.mv(
      `/home/crawlapps/Downloads/Practice/Mern stack/blog_app/src/public/blogs/${file.name}`,
      (err) => {
        if (err) {
          throw new Error(err);
        }
      }
    );
    const imageUrl = `http://localhost:3000/static/${file.name}`;
    const { user_id } = req.currentUser;
    const createdBlog = await blogRepo.createBlog(req.body, imageUrl, user_id);
    successResponseCreated(resp, createdBlog);
  } catch (error) {
    logger.log(level.error, `Create Blog error=${error}`);
    serverError(resp);
  }
};
// Get Blog
export const getBlogs = async (req, resp) => {
  logger.log(level.debug, '>>Get Blogs');
  try {
    const { user_id } = req.currentUser;
    const blogs = await blogRepo.getBlogs(req.query, user_id);
    successResponse(resp, blogs);
  } catch (error) {
    logger.log(level.error, `Get Blog error=${error}`);
    serverError(resp);
  }
};
// Get Blog
export const getBlogById = async (req, resp) => {
  logger.log(level.debug, '>>Get Blogs');
  try {
    // const { user_id } = req.currentUser;
    console.log(req.params.id);
    const blogs = await blogRepo.getBlogById(req.params.id);
    successResponse(resp, blogs);
  } catch (error) {
    logger.log(level.error, `Get Blog error=${error}`);
    serverError(resp);
  }
};

// Update Blog
export const updateBlog = async (req, resp) => {
  logger.log(level.debug, '>>Update Blog');
  try {
    const { user_id } = req.currentUser;
    const updatedBlog = await blogRepo.updateBlog(req.body, user_id, req.params.id);
    successResponse(resp, updatedBlog);
  } catch (error) {
    logger.log(level.error, `Update Blog error=${error}`);
    serverError(resp);
  }
};
// Delete Blog
export const deleteBlog = async (req, resp) => {
  logger.log(level.debug, '>>Delete Blog');
  try {
    const { user_id } = req.currentUser;
    const deletedBlog = await blogRepo.deleteBlog(user_id, req.params.id);
    successResponse(resp, deletedBlog);
  } catch (error) {
    logger.log(level.error, `Delete Blog error=${error}`);
    serverError(resp);
  }
};
//Delete cheked Blog
export const deleteCheckedBlogs = async (req, resp) => {
  logger.log(level.debug, '>>Delete Blog');
  try {
    const { user_id } = req.currentUser;
    // console.log(req.body);
    const deletedCheckedBlogs = await blogRepo.deletedCheckedBlogs(user_id, req.body);
    successResponse(resp, deletedCheckedBlogs);
  } catch (error) {
    logger.log(level.error, `Delete Blogs error=${error}`);
    serverError(resp);
  }
};
