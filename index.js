// import express from 'express';
// import path from 'path';
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';
import app from './custom/app.js';
import dotenv from 'dotenv';
import httpServer from './custom/server.js';
import { startSocket } from './custom/socket.js';
import { startMongoose } from './custom/mongoose.js';
import authRoute from './routes/authRouter.js';
import mainRoute from './routes/mainRouter.js';
import bodyParser from 'body-parser';


// ✅ Register the bodyParser middleware here
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

// Process.env
dotenv.config();
console.log('Environment is:', process.env.NODE_ENV);

// Static and Routes
// const __filename = fileURLToPath(import.meta.url),
//   __dirname = dirname(__filename);
// app.use(express.static(path.join(__dirname, 'routes')));

// Routes
app.use(mainRoute);
app.use('/auth', authRoute);

// Custom
startMongoose();
startSocket(httpServer);
