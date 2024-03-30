import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectToDb = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to Mongodb"))
    .catch((error) => console.log(error));
};

export default connectToDb;
