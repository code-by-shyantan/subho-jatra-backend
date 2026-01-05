const pool = require('../database/db');

exports.findByUsername = async (username) => {
  const result = await pool.query(
    'SELECT * FROM users WHERE username = $1 LIMIT 1',
    [username]
  );
  return result.rows[0];
};

exports.updatePasswordByUsername = async (username, passwordHash) => {
  await pool.query(
    'UPDATE users SET password_hash = $1 WHERE username = $2',
    [passwordHash, username]
  );
};

exports.updateManagerPermissions = async (username, permissions) => {
  await pool.query(
    'UPDATE users SET permissions = $1 WHERE username = $2 AND role = $3',
    [permissions, username, 'MANAGER']
  );
};
