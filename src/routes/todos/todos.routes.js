// eslint-disable-next-line no-func-assign

import { Router } from 'express';
import { appAuthMiddleware } from '../../middleware/authentication';
import { validate } from '../../validator/todos.validator';
import { constants as VALIDATOR } from '../../constant/validator/todos';
import * as todosController from '../../controllers/todos/todos.controller';
const routes = new Router({ mergeParams: true });

const PATH = {
  CREATE_TODO: '/',
  GET_TODOS: '/',
  UPDATE_TODO: '/:id',
  DELETE_TODO: '/:id',
  DELETE_CHEKED_TODOS: '/deletetodo'
};

routes.use(appAuthMiddleware);
/**
 * @api {POST} /api/todo/
 * @desc TODO create API
 * @access PRIVATE
 */
routes.post(PATH.CREATE_TODO, validate(VALIDATOR.CREATE_TODO), todosController.createTodo);
/**
 * @api {GET} /api/todo/
 * @desc Get all Todos of Authenticated user API
 * @access PRIVATE
 */
routes.get(PATH.GET_TODOS, todosController.getTodos);
/**
 * @api {PUT} /api/todo/:id
 * @desc Update TODO API
 * @access PRIVATE
 */
routes.put(PATH.UPDATE_TODO, todosController.updateTodo);
/**
 * @api {DELETE} /api/todo/:id
 * @desc Delete TODO API
 * @access PRIVATE
 */
routes.delete(PATH.DELETE_TODO, todosController.deleteTodo);
/**
 * @api {DELETE} /api/todo/
 * @desc Delete Checked TODOs API
 * @access PRIVATE
 */
routes.post(PATH.DELETE_CHEKED_TODOS, todosController.deleteCheckedTodos);

export default routes;
