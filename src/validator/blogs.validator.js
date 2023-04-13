import { body, param } from 'express-validator';
import { constants as VALIDATOR } from '../constant/validator/blogs';
// import jobsModel from "../models/jobs";

export const validate = (method) => {
  let error = [];
  switch (method) {
    case VALIDATOR.CREATE_BLOG:
      error = [
        body('title', 'Enter the Title!').not().isEmpty(),
        body('description', 'Enter the Description!').not().isEmpty(),
        body('category', 'Enter the Category!').not().isEmpty(),
        body('tags', 'Enter the Tags!').not().isEmpty(),
        body('image').custom((value, { req }) => {
          console.log(req.files);
          if (!req.files) {
            throw new Error('No file uploaded');
          }
          if (!req.files.image.mimetype.includes('image/')) {
            throw new Error('File must be an image');
          }
          return true;
        })
      ];
      break;
    case VALIDATOR.GET_BLOGS:
      error = [];
      break;
    case VALIDATOR.GET_BLOG:
      error = [param('id').not().isEmpty()];
      break;
    case VALIDATOR.UPDATE_BLOG:
      error = [
        param('id').not().isEmpty(),
        body('title', 'Enter the Title!').not().isEmpty(),
        body('description', 'Enter the Description!').not().isEmpty(),
        body('category', 'Enter the Category!').not().isEmpty(),
        body('tags', 'Enter the Tags!').not().isEmpty()
      ];
      break;
    case VALIDATOR.DELETE_BLOG:
      error = [param('id').not().isEmpty()];
      break;
  }
  return error;
};
