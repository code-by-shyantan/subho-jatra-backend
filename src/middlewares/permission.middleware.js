exports.requirePermission = (permissionKey) => {
  return (req, res, next) => {
    // Owner bypasses permission checks
    if (req.user.role === 'OWNER') {
      return next();
    }

    const permissions = req.user.permissions || {};
    if (!permissions[permissionKey]) {
      return res.status(403).json({ message: 'Permission denied' });
    }

    next();
  };
};
