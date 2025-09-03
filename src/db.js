import mongoose from 'mongoose';

const {MONGODB_URI} = process.env;

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('todo ok y conectado beibi');
  } catch (error) {
    console.log(error);
  }
};