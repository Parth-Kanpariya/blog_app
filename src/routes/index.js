/**
 * API Routes
 */

import { Router } from 'express';

import userRoutes from './user/user.routes';
import blogRoutes from './blogs/blogs.routes';
import todoRoutes from './todos/todos.routes';
// import git from "git-last-commit";
// import HTTPStatus from "http-status";
// const status = "backend service is running";
const routes = new Router();

const PATH = {
  ROOT: '/',
  USER: '/user',
  TODOS: '/todos',
  BLOGS: '/blogs'
};

// routes.get(PATH.ROOT, (_req, res) => {
//   try {
//     git.getLastCommit((err, commit) => {
//       if (err) {
//         return res.status(HTTPStatus.OK).json({
//           status,
//         });
//       }
//       return res.status(HTTPStatus.OK).json({
//         status,
//         info: commit.hash,
//       });
//     });
//   } catch (error) {
//     return res.status(HTTPStatus.OK).json({
//       status,
//     });
//   }
// });

routes.use(PATH.USER, userRoutes);
routes.use(PATH.TODOS, todoRoutes);
routes.use(PATH.BLOGS, blogRoutes);

export default routes;
