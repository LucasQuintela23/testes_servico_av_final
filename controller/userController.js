// userController.js
const express = require('express');
const router = express.Router();
const { login } = require('../service/userService');

router.post('/', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required.' });
  }
  const user = login(username, password);
  if (user) {
    return res.status(200).json({ message: 'Login successful.' });
  }
  return res.status(401).json({ message: 'Invalid credentials.' });
});

module.exports = router;
