import mongoose from "mongoose";

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

export const connectDB = async () => {
    mongoose.connect(process.env.MONGO_URI , options);
}