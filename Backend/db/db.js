import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(`${process.env.DB_STRING}`);
    console.log("Database connected");
  } catch (error) {
    console.error(error);
  }
};

export default connectDb;