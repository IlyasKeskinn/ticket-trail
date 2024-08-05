import mongoose from "mongoose";

let cached = (global as any).mongoose || { connection: null, promisee: null };
const MONGODB_URI = process.env.MONGODB_URI;

export const connectToDatabase = async () => {
  if (cached.connection) return cached.connection;

  if (!MONGODB_URI) throw new Error("MONGODB_URI is missing");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: "tictet_trail",
      bufferCommands: false,
    });
  cached.connection = await cached.promise;
  return cached.connection;
};