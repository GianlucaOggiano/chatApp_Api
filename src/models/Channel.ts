import { Schema, model } from 'mongoose';
import { ChannelDocument } from '../types';

const ChannelSchema: Schema<ChannelDocument> = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  admin: { type: Schema.Types.ObjectId, ref: 'User' },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
});

export const Channel = model<ChannelDocument>('Channel', ChannelSchema);
