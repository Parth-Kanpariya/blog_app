import { body, param } from 'express-validator';
import { constants as VALIDATOR } from '../constant/validator/likes';

export const validate = (method) => {
  let error = [];
  switch (method) {
    case VALIDATOR.CREATE_LIKE:
      error = [body('blog_id', 'Enter the blogId').not().isEmpty()];
      break;
    case VALIDATOR.GET_LIKES:
      error = [param('blogId', 'Please add blogId').not().isEmpty()];
      break;
  }
  return error;
};
