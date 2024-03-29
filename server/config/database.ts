import mongoose from "mongoose";

const connectToDb = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to Mongodb"))
    .catch((error) => console.log(error));
};

export default connectToDb;
