import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import logger from 'morgan';

const app: Application = express();

app.use(logger('dev'));
app.use(helmet());
app.use(cors());

app.get('/', (req, res, next) => {
  res.json({ message: 'Welcome on chat group API!' });
});

const PORT = process.env.PORT || 1234;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
