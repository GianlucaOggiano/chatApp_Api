import { Schema, model } from 'mongoose';

const MessageSchema = new Schema({
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export const Message = model('Message', MessageSchema);
