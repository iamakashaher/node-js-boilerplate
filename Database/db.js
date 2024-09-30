const mysql = require("mysql2");

// Create a connection pool with environment variables for database configuration
const dbPool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306, // Default port for MySQL
});

// Establish a connection to check the pool's health
dbPool.getConnection((error, connection) => {
  if (error) {
    console.error("Error connecting to the database:", error.message);
    return;
  }
  console.log("Database connection established successfully.");
  
  // Release the connection back to the pool
  if (connection) connection.release();
});

// Export the connection pool for use in other modules
module.exports = dbPool;
