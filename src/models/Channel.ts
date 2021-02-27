import { Schema, model } from 'mongoose';

const ChannelSchema = new Schema();

export const Channel = model('Channel', ChannelSchema);
