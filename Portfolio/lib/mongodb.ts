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

// Get MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI || '';

console.log('MongoDB URI defined:', !!MONGODB_URI);
// Don't log the full URI as it contains sensitive information
console.log('MongoDB URI pattern match:', MONGODB_URI.includes('mongodb://') || MONGODB_URI.includes('mongodb+srv://'));

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local or vercel.json');
}

let cached = global.mongoose as Cached;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectMongoDB() {
  if (cached.conn) {
    console.log('Using cached MongoDB connection');
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('Connecting to MongoDB...');
    console.log('MongoDB connection options:', {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });

    const opts = {
      bufferCommands: false,
      // Setting a higher timeout for Vercel deployments
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    };

    try {
      cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
        console.log('MongoDB connected successfully!');
        console.log('MongoDB connection state:', mongoose.connection.readyState);
        
        // Add a null check before accessing db.databaseName
        if (mongoose.connection.db) {
          console.log('MongoDB connected to database:', mongoose.connection.db.databaseName);
        } else {
          console.log('MongoDB connected but database information not available yet');
        }
        
        return mongoose;
      });
    } catch (error) {
      console.error('MongoDB connection error:', error);
      cached.promise = null;
      throw error;
    }
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (e) {
    console.error('Error waiting for MongoDB connection:', e);
    cached.promise = null;
    throw e;
  }
}

export default connectMongoDB; 