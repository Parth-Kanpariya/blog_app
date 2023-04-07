import { body } from 'express-validator';
import { constants as VALIDATOR } from '../constant/validator/todos';
// import jobsModel from "../models/jobs";

export const validate = (method) => {
  let error = [];
  switch (method) {
    case VALIDATOR.CREATE_TODO:
      error = [body('description', 'Enter the Task!').not().isEmpty()];
      break;
  }
  return error;
};
