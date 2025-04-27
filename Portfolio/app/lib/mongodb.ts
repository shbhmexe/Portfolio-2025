import mongoose from 'mongoose';

// Define connection interface
interface Cached {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Declare global type
declare global {
  var mongoose: Cached | undefined;
}

// Get MongoDB URI from environment variables and ensure it uses the portfolio database
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://demo-user:demo-password@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority';

let cached = global.mongoose as Cached;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectMongoDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
}

export default connectMongoDB; 