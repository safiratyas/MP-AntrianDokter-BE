const {
  Admins
} = require('../models');

module.exports = {
  update(id, updatedData) {
    return Admins.update(updatedData, {
      where: {
        id,
      },
    });
  },

  delete(id) {
    return Admins.destroy({
      where: {
        id,
      },
    });
  },

  
}