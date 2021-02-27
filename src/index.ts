import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import logger from 'morgan';
import { PORT, PROTOCOL, HOST, CORS_OPTIONS, IS_DEVELOPMENT } from './config';

const app: Application = express();

IS_DEVELOPMENT ? app.use(logger('dev')) : null;
app.use(helmet());
app.use(cors(CORS_OPTIONS));

app.get('/', (req, res, next) => {
  res.json({ message: 'Welcome on chat group API!' });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PROTOCOL}://${HOST}:${PORT}`);
});
