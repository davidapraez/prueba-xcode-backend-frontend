import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error("La variable MONGO_URI no está definida en el .env");
    }

    await mongoose.connect(uri);
    console.log("✅ Conectado a MongoDB Atlas exitosamente");
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
