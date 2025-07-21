import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import usersRoutes from "./routes/users.routes";
import catsRoutes from "./routes/cats.routes";
import dotenv from "dotenv";

const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());

app.use("/api/users", usersRoutes);
app.use("/api/breeds", catsRoutes);

export const startServer = async (port: number) => {
  await connectDB();

  app.listen(port, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
  });
};

export default app;
