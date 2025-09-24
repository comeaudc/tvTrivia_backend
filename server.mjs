// Imports
import express from "express";
import dotenv from "dotenv";
import { globalErr, log } from "./middleware/middleware.mjs";
import connectDB from "./db/conn.mjs";

// Setups
dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();

// DB Connection
connectDB();

// Middleware
app.use(express.json());
app.use(log);

// Routes

// Global Err Handling
app.use(globalErr);

// Listener
app.listen(PORT, () => {
  console.log(`Server Running on PORT: ${PORT}`);
});
