import express, { Application } from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cors from 'cors';
import helmet from 'helmet';
import logger from 'morgan';
import multer from 'multer';

import {
  PORT,
  PROTOCOL,
  HOST,
  CORS_OPTIONS,
  IS_DEVELOPMENT,
  MONGO_URI,
  MONGO_OPTIONS,
  SESSION_OPTIONS,
  CONNECT_MONGO_OPTIONS,
} from './config';
import { AuthRoutes, UserRoutes } from './routes';
import { GlobalErrorHandler, NotFound } from './middleware/errors';
import { isAuth } from './middleware/auth';

declare module 'express-session' {
  interface SessionData {
    userId: string;
  }
}

(async () => {
  try {
    await mongoose.connect(MONGO_URI, MONGO_OPTIONS);
    IS_DEVELOPMENT ? mongoose.set('debug', true) : null;

    //TODO:continue this!!!!!!!!!!!!

    // const storage = multer.diskStorage({
    //   destination: 'uploads/',
    //   filename: (req, file, cb) => {},
    // });
    // const upload = multer({
    //   storage,
    //   // fileFilter,
    // });

    const app: Application = express();
    app.use(express.json());

    IS_DEVELOPMENT ? app.use(logger('dev')) : null;
    app.use(helmet());
    app.use(cors(CORS_OPTIONS));

    app.use(
      session({
        ...SESSION_OPTIONS,
        store: MongoStore.create(CONNECT_MONGO_OPTIONS),
      })
    );

    app.get('/', isAuth, (req, res, next) => {
      res.json({ message: 'Welcome on chat group API!' });
    });
    app.use('/api/auth', AuthRoutes);
    app.use('/api/user', UserRoutes);

    app.use(NotFound);
    app.use(GlobalErrorHandler);

    app.listen(PORT, () => {
      console.log(`Server running on ${PROTOCOL}://${HOST}:${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit();
  }
})();
