const User = require('../models/User');

exports.getAllUsers = async (req, res, next) => {
  try {

    const users = await User.findAll({
      order: [['createdAt', 'DESC']],
    });
    
    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};
