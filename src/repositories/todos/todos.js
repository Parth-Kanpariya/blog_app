/* eslint-disable no-unused-vars */
import { logger, level } from '../../config/logger';
import todoModel from '../../models/todos';

// create todo
export const createTodo = async (body, userId) => {
  logger.log(level.info, `>> Create Job repo body=${JSON.stringify(body)}`);
  let data = {};
  const todoExist = await todoModel.isExist({
    ...body,
    description: body.description.toLowerCase(),
    user_id: userId
  });
  if (todoExist) {
    data = {
      error: true,
      message: 'Todo Already exist!'
    };
    return data;
  }

  const newTodo = await todoModel.add({
    ...body,
    description: body.description.toLowerCase(),
    user_id: userId
  });
  data = {
    error: false,
    message: 'Job Created!!',
    newTodo
  };

  return data;
};
// get todo
export const getTodos = async (query, userId) => {
  logger.log(level.info, `>> get Todo repo`);
  const docLength = await todoModel.count({ user_id: userId });
  const todos = await todoModel.get({ user_id: userId }, null, {
    sort: { created_at: 'desc' },
    page: +query.page,
    limit: +query.limit
  });
  let data = {};
  if (!todos || todos.length <= 0) {
    data = {
      error: true,
      message: 'No Todos Found!!'
    };
    return data;
  }

  data = { error: false, message: 'succ_02', data: todos, totalDocs: docLength };
  return data;
};
// update todo

export const updateTodo = async (body, userId, todoId) => {
  logger.log(level.info, `>> update Todo repo`);
  const todos = await todoModel.get({
    todo_id: todoId,
    user_id: userId
  });
  let data = {};
  if (!todos || todos.length <= 0) {
    data = {
      error: true,
      message: 'No Todo Found!!'
    };
    return data;
  }
  const updatedTodo = await todoModel.update(
    {
      user_id: userId,
      todo_id: todoId
    },
    body,
    {
      new: true,
      runValidators: true
    }
  );

  data = {
    error: false,
    message: 'Todo updated!',
    data: updatedTodo
  };
  return data;
};

// delete todo
export const deleteTodo = async (userId, todoId) => {
  logger.log(level.info, `>> Delete todo repo`);
  const todos = await todoModel.get({
    todo_id: todoId,
    user_id: userId
  });
  let data = {};
  if (!todos || todos.length <= 0) {
    data = {
      error: true,
      message: 'No Todo Found to delete!!'
    };
    return data;
  }
  await todoModel.delete({ user_id: userId, todo_id: todoId });

  data = {
    message: 'Todo deleted!!'
  };
  return data;
};

// delete cheked todos
export const deletedCheckedTodos = async (userId, body) => {
  logger.log(level.info, `>> Delete todo repo`);
  const todos = await todoModel.get({
    user_id: userId
  });
  let data = {};
  if (!todos || todos.length <= 0) {
    data = {
      error: true,
      message: 'No Todo Found to delete!!'
    };
    return data;
  }
  // await todoModel.deleteMultiple({ user_id: userId });
  console.log(body);
  await todoModel.deleteMultiple({
    todo_id: {
      $in: body.todos
    }
  });

  data = {
    message: 'Todo deleted!!'
  };
  return data;
};
