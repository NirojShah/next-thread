import mongoose from "mongoose";

const MONGODB_URI = "mongodb://localhost:27017/threads";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn; // already connected
  }
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 30000, // increased timeout for slower connections
        bufferCommands: false, // optional: disables buffer commands
      })
      .then((mongooseInstance) => {
        console.log("MongoDB connected");
        return mongooseInstance;
      })
      .catch((error) => {
        console.error("MongoDB connection error:", error);
        cached.promise = null; // reset promise on failure
        throw error;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}