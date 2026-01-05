const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');

const TOKEN_EXPIRY = '8h';

const issueToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
      permissions: user.permissions || {}
    },
    process.env.JWT_SECRET,
    { expiresIn: TOKEN_EXPIRY }
  );
};

exports.ownerLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await userService.findByUsername(username);
    if (!user || user.role !== 'OWNER' || !user.is_active) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = issueToken(user);
    res.json({ token, role: 'OWNER' });
  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
  }
};

exports.managerLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await userService.findByUsername(username);
    if (!user || user.role !== 'MANAGER' || !user.is_active) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = issueToken(user);
    res.json({ token, role: 'MANAGER', permissions: user.permissions || {} });
  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
  }
};

exports.resetManagerPassword = async (req, res) => {
  try {
    const { managerUsername, newPassword } = req.body;

    const user = await userService.findByUsername(managerUsername);
    if (!user || user.role !== 'MANAGER') {
      return res.status(404).json({ message: 'Manager not found' });
    }

    const hash = await bcrypt.hash(newPassword, 10);
    await userService.updatePasswordByUsername(managerUsername, hash);

    res.json({ message: 'Manager password reset successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Password reset failed' });
  }
};
