// userService.js
import { users } from '../model/userModel.js';

export const userService = {
  login(username, password) {
    if (!username || !password) return { error: 'invalid_data' };
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      return { token: 'fake-jwt-token', user };
    }
    return false;
  }
};