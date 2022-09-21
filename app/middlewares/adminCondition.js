const adminServices = require('../services/admins');

module.exports = {
  async checkCondition(req, res, next) {
    const {
      name,
      email,
      password,
      gender
    } = req.body;

    if (password.length < 8) {
      res.status(400).json({
        status: 'Failed',
        message: 'Password must have at least 8 characters!'
      });
      return;
    }

    if (!name) {
      res.status(400).json({
        status: 'Failed',
        message: 'Name cannot be empty!'
      });
      return;
    }

    const filter = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/g;

    if (email == '' || email.search(filter) == -1) {
      res.status(400).json({
        status: 'Failed',
        message: 'Wrong email format!'
      });
      return;
    }

    const uniqueEmail = await adminServices.getOne({
      where: {
        email
      },
    });

    if (uniqueEmail) {
      res.status(409).json({
        status: 'Failed',
        message: 'Email already taken!'
      });
      return;
    }

    if (gender !== 'Pria' && gender !== 'Wanita') {
      res.status(400).json({
        status: 'Failed',
        message: 'Gender must be filled either Pria or Wanita'
      });
      return;
    }

    next();
  }
};