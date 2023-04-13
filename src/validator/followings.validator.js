import { param, query } from 'express-validator';
import { constants as VALIDATOR } from '../constant/validator/followings';

export const validate = (method) => {
  let error = [];
  switch (method) {
    case VALIDATOR.CREATE_FOLLOWING:
      error = [query('blogUserId', 'Blog user Id required').not().isEmpty()];
      break;
    case VALIDATOR.GET_FOLLOWING:
      error = [param('blogUserID', 'Blog user Id required').not().isEmpty()];
      break;
    case VALIDATOR.GET_MY_FOLLOWING:
      error = [];
      break;
    case VALIDATOR.UNFOLLOW_SERVICE:
      error = [param('blogUserID', 'Blog user Id required').not().isEmpty()];
      break;
  }
  return error;
};
