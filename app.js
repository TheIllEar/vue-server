import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import authRoute from './routes/auth.js';
import mongoose from 'mongoose';

const app = express(),
  __filename = fileURLToPath(import.meta.url),
  __dirname = dirname(__filename),
  PORT = process.env.PORT || 3000; 


//Указываем для нунчак расширение файлов, которое будем использовать
// app.set('view engine', 'html');


//static and routes
app.use(express.static(path.join(__dirname, 'routes')));
app.use('/auth', authRoute);

//server
app.listen(PORT, () => {
  startMongoose();
  console.log('Started on port:', PORT);
});


const startMongoose = async () => {
  try {
    let url = 'mongodb+srv://theillear:bkvLnOM8LcmjqK4H@cluster0.ukbdsgp.mongodb.net/Auth?retryWrites=true&w=majority';
    let resp = await mongoose.connect(url);
    console.log('resp');
  } catch (e) {
    console.log('err', e);
  }
};