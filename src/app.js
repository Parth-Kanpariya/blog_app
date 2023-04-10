import httpContext from 'express-http-context';
import './config/database.js';
import middlewaresConfig from './config/middlewares';
import { logger, level } from './config/logger';
import express from 'express';
import { constants as APP_CONST } from './constant/application';
import ApiRoutes from './routes/index';
import fs from 'fs';

const app = express();

const PATH = {
  ROOT: '/',
  API: '/api'
};
app.set('trust proxy', true);

// app.set('view engine', 'pug');
// Wrap all the middlewares with the server
middlewaresConfig(app);
app.use('/static', express.static(APP_CONST.PUBLIC_PATH));
app.use('/static', express.static(APP_CONST.PROFILE_PATH));
app.use('/static', express.static(APP_CONST.BLOG_PATH));

app.use(httpContext.middleware);

fs.mkdirSync(APP_CONST.PROFILE_PATH, { recursive: true });

// Add the apiRoutes stack to the server
app.use(PATH.API, ApiRoutes);

process
  .on('unhandledRejection', (error) => {
    logger.log(
      level.error,
      `Unhandled Rejection at Promise : ${JSON.stringify(error)} ${error.stack}`
    );
  })
  .on('uncaughtException', (error) => {
    logger.log(level.error, `Uncaught Exception thrown : ${JSON.stringify(error)} ${error.stack}`);
    process.exit(1);
  });

app.listen(APP_CONST.PORT, (err) => {
  if (err) {
    logger.log(level.error, `Cannot run due to ${err}!`);
  } else {
    logger.log(level.info, `server started on port ${APP_CONST.PORT}`);
  }
});

export default app;
