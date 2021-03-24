const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../../controllers/users');

// Register Handle
router.post("/register", registerUser);

// Login Handle
router.post("/login", loginUser);

module.exports = router;