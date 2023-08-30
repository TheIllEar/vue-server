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
import cors from 'cors';

// Process.env
dotenv.config();
console.log('Environment is:', process.env.NODE_ENV);

// ✅ Register the bodyParser middleware here
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Cors
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
const ALLOW_LIST = [process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'https://theillear.github.io'];
const corsOptionsDelegate = (req, callback) => {
  const corsOptions = { origin: false };
  if (ALLOW_LIST.indexOf(req.header('Origin')) !== -1) corsOptions.origin = true;
  callback(null, corsOptions); // expects two parameters: error and options
};
app.use(cors(corsOptionsDelegate));

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
