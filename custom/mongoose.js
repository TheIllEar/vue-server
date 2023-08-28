/**
 * Аутентификация
 */

import mongoose from 'mongoose';

export const startMongoose = async () => {
  try {
    const url = 'mongodb+srv://theillear:bkvLnOM8LcmjqK4H@cluster0.ukbdsgp.mongodb.net/Auth?retryWrites=true&w=majority',
      resp = await mongoose.connect(url);
    console.log('Mongo connected');
  } catch (e) {
    console.log('Error', e);
  }
};
