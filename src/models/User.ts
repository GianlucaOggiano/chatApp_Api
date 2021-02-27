import { compare, hash } from 'bcryptjs';
import { Schema, model } from 'mongoose';
import { UserDocument } from '../types';

const UserSchema: Schema<UserDocument> = new Schema(
  {
    displayName: { type: String },
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

UserSchema.methods.matchesPassword = function (password: string) {
  return compare(password, this.password);
};

export const User = model<UserDocument>('User', UserSchema);
