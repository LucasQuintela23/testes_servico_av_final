// userService.js

import { users } from '../model/userModel.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../middleware/authMiddleware.js';

export const userService = {
  login(username, password) {
    if (!username || !password) return { error: 'invalid_data' };
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
      return { token, user };
    }
    return false;
  }
};