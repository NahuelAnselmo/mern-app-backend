// import morgan from 'morgan';
// import cors from 'cors';

import app from './app.js';
import { connectDB } from './db.js';

// const PORT = process.env.PORT || 3000;

// app.use(morgan('dev'));
// app.use(cors());
connectDB();
app.listen(3000);
console.log('server on port', 3000);
