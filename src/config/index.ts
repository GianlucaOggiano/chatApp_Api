import { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import { ConnectOptions } from 'mongoose';

dotenv.config({
  path: process.env.NODE_ENV === 'development' ? '.env' : '.env.production',
});

export const {
  PORT,
  PROTOCOL,
  HOST,
  MONGO_URI = 'mongodb://localhost:27017/chat-app',
} = process.env;

export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

export const CORS_OPTIONS: CorsOptions = {};

export const MONGO_OPTIONS: ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
