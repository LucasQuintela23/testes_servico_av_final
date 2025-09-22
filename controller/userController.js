// userController.js
import express from 'express';
import { userService } from '../service/userService.js';
const router = express.Router();

router.post('/', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required.' });
  }
  const result = userService.login(username, password);
  if (result && result.token) {
    return res.status(200).json(result);
  }
  if (result && result.error) {
    return res.status(401).json(result);
  }
  return res.status(401).json({ error: 'Invalid credentials.' });
});

export default router;
