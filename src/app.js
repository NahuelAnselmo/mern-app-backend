import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';

import { errorHandler } from './middlewares/errorHandler.js';
import authRoutes from './routes/auth.routes.js';
import tasksRoutes from './routes/tasks.routes.js';

dotenv.config();

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.',
});
app.use(limiter);

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(errorHandler);

app.use('/api', authRoutes);
app.use('/api', tasksRoutes);

export default app;
