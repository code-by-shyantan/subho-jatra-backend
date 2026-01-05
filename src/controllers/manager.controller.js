const managerService = require('../services/manager.service');
const userService = require('../services/user.service');

exports.updatePermissions = async (req, res) => {
  try {
    const { managerUsername, permissions } = req.body;

    const manager = await userService.findByUsername(managerUsername);
    if (!manager || manager.role !== 'MANAGER') {
      return res.status(404).json({ message: 'Manager not found' });
    }

    await managerService.updateManagerPermissions(managerUsername, permissions);
    res.json({ message: 'Permissions updated' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update permissions' });
  }
};

exports.setStatus = async (req, res) => {
  try {
    const { managerUsername, isActive } = req.body;

    const manager = await userService.findByUsername(managerUsername);
    if (!manager || manager.role !== 'MANAGER') {
      return res.status(404).json({ message: 'Manager not found' });
    }

    await managerService.setManagerStatus(managerUsername, isActive);
    res.json({ message: 'Manager status updated' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update status' });
  }
};
