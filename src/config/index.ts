import { ConnectMongoOptions } from 'connect-mongo/build/main/lib/MongoStore';
import { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import { SessionOptions } from 'express-session';
import { ConnectOptions } from 'mongoose';

dotenv.config({
  path: process.env.NODE_ENV === 'development' ? '.env' : '.env.production',
});

export const {
  PORT = 1234,
  PROTOCOL = 'http',
  HOST = 'localhost',
  MONGO_URI = 'mongodb://localhost:27017/chat-app',
  SESSION_SECRET = 'super_secret_session',
} = process.env;

export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

export const CORS_OPTIONS: CorsOptions = {};

export const MONGO_OPTIONS: ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export const SESSION_OPTIONS: SessionOptions = {
  name: 'sid',
  secret: SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
  },
};

export const CONNECT_MONGO_OPTIONS: ConnectMongoOptions = {
  mongoUrl: MONGO_URI,
  collectionName: 'sessions',
  ttl: 1000 * 60 * 60 * 24,
  autoRemove: 'native',
};
