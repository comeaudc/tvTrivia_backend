// Imports
import express from "express";
import dotenv from "dotenv";

// Setups
dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();

// DB Connection

// Middleware
app.use(express.json());
app.use((req, _res, next) => {
  console.log(`${req.method} - ${req.path}`);
  next();
});

// Routes

// Global Err Handling
app.use((err, _req, res, _next) => {
  res.json({ msg: `❌ Error - ${err.message}` });
});

// Listener
app.listen(PORT, () => {
  console.log(`Server Running on PORT: ${PORT}`);
});
