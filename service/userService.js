// userService.js
const { users } = require('../model/userModel');

function login(username, password) {
  if (!username || !password) return false;
  return users.find(u => u.username === username && u.password === password);
}

module.exports = { login };