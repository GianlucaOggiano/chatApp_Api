import { hash } from 'bcryptjs';
import { Schema, model, Document } from 'mongoose';

export interface UserDocument extends Document {
  displayName: string;
  email: string;
  password: string;
  bio: string;
  photoURL: string;
  phoneNumber: string;
}

const UserSchema = new Schema(
  {
    displayName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    bio: { type: String },
    photoURL: { type: String },
    phoneNumber: { type: String },
  },
  { timestamps: true }
);

UserSchema.pre<UserDocument>('save', async function () {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 12);
  }
});

export const User = model<UserDocument>('User', UserSchema);
