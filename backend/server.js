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

// In production hosts (Render) the app may be behind a proxy — enable trust proxy so secure cookies work correctly
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// Middleware: allow origin to be configured via CLIENT_URL env var (useful for Netlify frontend)
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
app.use(cors({
    origin: CLIENT_URL,
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
// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  connectDB();
  console.log(`✅ Server is running on port ${PORT}`);
})