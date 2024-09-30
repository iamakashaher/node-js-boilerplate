const express = require('express');
const router = express.Router();

const UserController = require('../Controllers/Users.Controller');

//Get a list of all products
router.get('/', UserController.getAllUsers);

// Login API endpoint
router.post('/login', UserController.login);

module.exports = router;
