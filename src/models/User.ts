import { compare, hash } from 'bcryptjs';
import { Schema, model } from 'mongoose';
import { UserDocument } from '../types';

const UserSchema: Schema<UserDocument> = new Schema(
  {
    displayName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    bio: { type: String, default: '' },
    photoURL: { type: String, default: '' },
    phoneNumber: { type: String, default: '' },
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

UserSchema.set('toJSON', {
  transform: (doc: any, { __v, password, ...rest }: any, options: any) => rest,
});

export const User = model<UserDocument>('User', UserSchema);
