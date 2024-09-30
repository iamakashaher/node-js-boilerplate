const dbPool = require("../Database/db.js"); // Import the database connection pool
const util = require("util"); // Import the util module for promisifying
const query = util.promisify(dbPool.query).bind(dbPool); // Promisify the query method for async/await usage

module.exports = {
  // Function to fetch all users from the database
  async getAllUsers() {
    try {
      // Execute the query to fetch user details
      const userDetails = await query("SELECT * FROM common_user");

      // Check if user details were retrieved successfully
      if (userDetails.length > 0) {
        return {
          statusCode: 200, // HTTP status code for successful retrieval
          message: "Fetched successfully", // Success message
          data: userDetails, // User data
        };
      } else {
        return {
          statusCode: 404, // HTTP status code for not found (Myself: Move it to config - Akash)
          message: "No data found", // Message indicating no users were found
          data: null, // No data
        };
      }
    } catch (error) {
      // Handle any errors that occur during the database query
      return {
        statusCode: 500, // HTTP status code for server errorn (Myself: Move it to config - Akash)
        message: "Failed to fetch data", // Error message
        data: error.message, // Detailed error message
      };
    }
  },

  async findByEmailAddress(emailAddress) {
    try {
      // Execute the query and return the results
      const results = await query("SELECT * FROM common_user WHERE emailAddress = ?", [emailAddress]);
      return results; // Returns an array of user(s) matching the emailAddress
    } catch (error) {
      console.error("Error fetching user by emailAddress:", error.message);
      throw error; // Rethrow the error for further handling
    }
  },
};
