import { body, param } from 'express-validator';
import { constants as VALIDATOR } from '../constant/validator/comments';

export const validate = (method) => {
  let error = [];
  switch (method) {
    case VALIDATOR.CREATE_COMMENT:
      error = [body('text', 'Enter the Comment!').not().isEmpty()];
      break;
    case VALIDATOR.GET_COMMENTS:
      error = [param('blogId', 'Blog id require').not().isEmpty()];
  }
  return error;
};
