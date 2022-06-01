import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path'

import express from 'express';

import userRouter from './routes/userRoutes.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Start express app
const app = express();


// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));


app.use('/api/v1/users', userRouter);

export default app;
