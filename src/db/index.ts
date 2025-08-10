import mongoose from "mongoose";

const connectDb = async () => {
  console.log(process.env.MONGODB_URI);
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Failed to connect db", error);
    process.exit(1);
  }
};

export default connectDb;
