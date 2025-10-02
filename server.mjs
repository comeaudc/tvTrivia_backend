// Imports
import express from "express";
import dotenv from "dotenv";
import { globalErr, log } from "./middleware/middleware.mjs";
import connectDB from "./db/conn.mjs";
import questionRoutes from "./routes/questionRoutes.mjs";
import categoryRoutes from "./routes/categoryRoutes.mjs";
import gameRoutes from "./routes/gameRoutes.mjs";
import userRoutes from "./routes/userRoutes.mjs";
import authRoutes from "./routes/authRoutes.mjs";

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
app.use("/api/question", questionRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/game", gameRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

// Global Err Handling
app.use(globalErr);

// Listener
app.listen(PORT, () => {
  console.log(`Server Running on PORT: ${PORT}`);
});
