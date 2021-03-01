import { Document } from 'mongoose';

export interface UserDocument extends Document {
  displayName: string;
  email: string;
  password: string;
  bio: string;
  photoURL: string;
  phoneNumber: string;
  matchesPassword: (password: string) => Promise<boolean>;
}

export interface ChannelDocument extends Document {
  name: string;
  description: string;
  admin: string;
  members: [string];
  messages: [string];
}
