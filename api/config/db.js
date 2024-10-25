import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(String(process.env.DB_URL));
    console.log(`DB Connected: ${conn.connection.host}`);
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error: ${err.message}`);
    } else {
      console.error('Error: An unknown error occurred');
    }
    process.exit(1);
  }
};

export default connectDB;
