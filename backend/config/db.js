const mongoose = require('mongoose');

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return; // reuse existing connection (serverless warm start)
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Error: ${error.message}`);
    if (!process.env.VERCEL) process.exit(1); // don't kill the serverless process on Vercel
  }
};

module.exports = connectDB;
