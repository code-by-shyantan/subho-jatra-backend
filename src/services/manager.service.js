const pool = require('../database/db');

exports.updateManagerPermissions = async (username, permissions) => {
  await pool.query(
    'UPDATE users SET permissions = $1 WHERE username = $2 AND role = $3',
    [permissions, username, 'MANAGER']
  );
};

exports.setManagerStatus = async (username, isActive) => {
  await pool.query(
    'UPDATE users SET is_active = $1 WHERE username = $2 AND role = $3',
    [isActive, username, 'MANAGER']
  );
};
