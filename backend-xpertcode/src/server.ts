import dotenv from "dotenv";
dotenv.config();

import { startServer } from "./app";

const PORT = Number(process.env.PORT) || 3000;
startServer(PORT);
