import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import userRouter from './routes/userRoutes.js';
import blogRouter from './routes/blogRoutes.js';
import commentRouter from './routes/commentRoutes.js' 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Start express app
const app = express();

app.options('*', cors());

app.options(cors());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/')));
app.use(express.static('node_modules'));


// Set security HTTP headers
app.use(helmet());
helmet.contentSecurityPolicy();

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/blogs', blogRouter);
app.use('/api/v1/comment', commentRouter)

export default app;
