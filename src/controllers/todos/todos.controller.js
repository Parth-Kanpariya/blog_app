// eslint-disable-next-line no-func-assign

import { logger, level } from '../../config/logger';
import {
  serverError,
  successResponse,
  successResponseCreated,
  badRequestError
} from '../../utils/utility';
import { validationResult } from 'express-validator';
import * as todoRepo from '../../repositories/todos/todos';

// Create Todo
export const createTodo = async (req, resp) => {
  logger.log(level.debug, '>>Create Todo');
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      return badRequestError(resp, errors);
    }
    const { user_id } = req.currentUser;
    const createdTodo = await todoRepo.createTodo(req.body, user_id);
    successResponseCreated(resp, createdTodo);
  } catch (error) {
    logger.log(level.error, `Create todo error=${error}`);
    serverError(resp);
  }
};
// Get Todo
export const getTodos = async (req, resp) => {
  logger.log(level.debug, '>>Get Todos');
  try {
    const { user_id } = req.currentUser;
    const todos = await todoRepo.getTodos(req.query, user_id);
    successResponse(resp, todos);
  } catch (error) {
    logger.log(level.error, `Get todos error=${error}`);
    serverError(resp);
  }
};
// Update Todo
export const updateTodo = async (req, resp) => {
  logger.log(level.debug, '>>Update Todo');
  try {
    const { user_id } = req.currentUser;
    const updatedTodo = await todoRepo.updateTodo(req.body, user_id, req.params.id);
    successResponse(resp, updatedTodo);
  } catch (error) {
    logger.log(level.error, `Update Todo error=${error}`);
    serverError(resp);
  }
};
// Delete Todo
export const deleteTodo = async (req, resp) => {
  logger.log(level.debug, '>>Delete Todo');
  try {
    const { user_id } = req.currentUser;
    const deletedTodo = await todoRepo.deleteTodo(user_id, req.params.id);
    successResponse(resp, deletedTodo);
  } catch (error) {
    logger.log(level.error, `Delete todo error=${error}`);
    serverError(resp);
  }
};
//Delete cheked Todos
export const deleteCheckedTodos = async (req, resp) => {
  logger.log(level.debug, '>>Delete Todo');
  try {
    const { user_id } = req.currentUser;
    // console.log(req.body);
    const deletedCheckedTodos = await todoRepo.deletedCheckedTodos(user_id, req.body);
    successResponse(resp, deletedCheckedTodos);
  } catch (error) {
    logger.log(level.error, `Delete todo error=${error}`);
    serverError(resp);
  }
};
