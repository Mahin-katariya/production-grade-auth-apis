import mongoose from "mongoose";

// database is on different continent (takes time)
// database connection can fail!

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected ${conn.connection.host}`);
    
}

export default connectDB;
