const mongoose = require('mongoose');

let connectionPromise = null;

const connectDB = () => {
  if (mongoose.connection.readyState === 1) return Promise.resolve(); // reuse existing connection (serverless warm start)
  if (connectionPromise) return connectionPromise; // a connect is already in flight — reuse it

  connectionPromise = mongoose.connect(process.env.MONGO_URI)
    .then((conn) => {
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    })
    .catch((error) => {
      console.error(`MongoDB Error: ${error.message}`);
      connectionPromise = null; // allow a retry on the next request
      if (!process.env.VERCEL) process.exit(1);
      throw error;
    });

  return connectionPromise;
};

module.exports = connectDB;
