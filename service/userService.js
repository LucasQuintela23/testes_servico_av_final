// userService.js
import { users } from '../model/userModel.js';

export const userService = {
  login(username, password) {
    if (!username || !password) return false;
    return users.find(u => u.username === username && u.password === password);
  }
};