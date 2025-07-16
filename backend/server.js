import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


import connectDB from './config/db.js';
import linkRoutes from './routes/link.route.js';
import { getLink } from './controllers/link.controller.js';
import userRoutes from './routes/user.route.js';
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`); // Log every incoming request
  next();
});


// Routes
app.use('/api', linkRoutes);
app.get('/:id', getLink);
app.use('/api/auth', userRoutes);


// Please dont judge me
app.get('/', (req, res) => {
  res.send('Backend is running ');
});

// I love port 5000
app.listen(process.env.PORT || 5001, () => {
    connectDB();
    console.log(`✅ Server is running on http://localhost:${process.env.PORT || 5001}`);
})