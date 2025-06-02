const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const bcrypt = require('bcrypt');

// Đăng nhập
router.post('/login', async (req, res) => {
  try {
    const { fullName, password } = req.body;

    if (!fullName || !password) {
      return res.status(400).json({ message: 'Full name and password are required' });
    }

    const users = await userService.getAll();
    const user = users.find((u) => u.fullName === fullName);
    if (!user) {
      return res.status(401).json({ message: 'Tài khoản không tồn tại!' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Mật khẩu sai!' });
    }

    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;