const createError = require("http-errors");
const dbPool = require("../Database/db.js");
const UserModel = require("../Models/User.model.js");
const bcrypt = require("bcrypt");

module.exports = {
  // Handler to get all users
  getAllUsers: async (req, res, next) => {
    try {
      // Fetch user details using the UserModel
      const userDetails = await UserModel.getAllUsers();

      // Send the retrieved user details as a response
      res.send(userDetails);
    } catch (error) {
      // Log the error message for debugging purposes
      console.log(error.message);

      // Pass the error to the next middleware for proper error handling
      next(createError(500, "Failed to fetch user details"));
    }
  },

  // Login function to authenticate a user
  async login(req, res, next) {
    const { emailAddress, password } = req.body; // Extract emailAddress and password from request body

    try {
      // Fetch the user by emailAddress
      const [user] = await UserModel.findByEmailAddress(emailAddress); // Assume a method exists to find a user by emailAddress

      if (!user) {
        return next(createError(401, "Invalid emailAddress or password")); // 401 Unauthorized
      }

      // Compare the provided password with the hashed password in the database
      // const isPasswordValid = await bcrypt.compare(password, user.userPassword);
      const isPasswordValid = password === user.userPassword ? true : false;

      if (!isPasswordValid) {
        return next(createError(401, "Invalid emailAddress or password")); // 401 Unauthorized
      }

      // If login is successful, send a success response
      res.status(200).json({
        statusCode: 200,
        message: "Login successful",
        data: {
          userId: user.id,
          emailAddress: user.emailAddress,
          // You can include additional user info if necessary
        },
      });
    } catch (error) {
      console.error("Login error:", error.message);
      return next(createError(500, "Internal Server Error")); // 500 Internal Server Error
    }
  },
};
