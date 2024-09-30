const express = require("express");
const createError = require("http-errors");
const dotenv = require("dotenv").config();

const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize the database connection (uncomment if needed)
// const initDatabaseConnection = require("./initDB");

// Import and use user routes
const userRoutes = require("./routes/user.route");
app.use("/users", userRoutes);

// 404 Not Found handler
app.use((req, res, next) => {
  next(createError(404, "Resource not found"));
});

// Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    error: {
      status: statusCode,
      message: err.message,
    },
  });
});

// Define the port (default to 3000 if not set in environment variables)
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
