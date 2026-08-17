require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Connect to MongoDB (fire-and-forget here; requests wait on it via the middleware below)
connectDB();

const app = express();
app.set('trust proxy', 1);

// Ensure the DB connection is ready before handling any request — critical on
// serverless (Vercel), where a cold start's first request can otherwise arrive
// before mongoose finishes connecting and time out waiting on buffered queries.
app.use((req, res, next) => {
  connectDB().then(() => next()).catch(next);
});

// Security
app.use(helmet());
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim());

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

// Rate limiting
app.use('/api/contact', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many submissions. Please try again later.' },
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/portfolio', require('./routes/portfolio'));
app.use('/api', require('./routes/services'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'PhaseCore API is running', env: process.env.NODE_ENV });
});

// Error handler
app.use(errorHandler);

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT} [${process.env.NODE_ENV}]`));
}

module.exports = app;
