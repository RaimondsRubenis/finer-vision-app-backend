import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import rateLimit from 'express-rate-limit';

import formRoutes from './src/routes/formRoutes.js';
import {steps} from './src/routes/formRoutes.js';

import https from 'https'; //TODO if I'll get the time to implement SSL
import http from 'http';

const app = express();

app.use(express.json());

//TODO define port for dev & prod in .ENV file
let httpPort = 3001;

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors());

const numberOfRequestsLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 600, // start blocking after X requests
  message: 'Too Many Requsts',
});

// Routes
app.use('/', numberOfRequestsLimit, formRoutes);

app.use(function (err, req, res, next) {
  if (err.status && err.status < 500) {
    return res.status(400).send('Request Aborted');
  }
});

http.createServer(app).listen(httpPort, () => console.log(`Http listening on ${httpPort}`));