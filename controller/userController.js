// userController.js
import express from 'express';
import { userService } from '../service/userService.js';
const router = express.Router();

router.post('/', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required.' });
  }
  const user = userService.login(username, password);
  if (user) {
    return res.status(200).json({ message: 'Login successful.' });
  }
  return res.status(401).json({ message: 'Invalid credentials.' });
});

export default router;
