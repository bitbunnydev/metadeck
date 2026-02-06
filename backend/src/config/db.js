import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅Database connected");
  } catch (error) {
    console.error("⛔Database connection problem", error);
    process.exit(1);
  }
};
