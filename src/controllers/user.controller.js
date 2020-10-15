const getAllUsers = (req, rpl) => {
  rpl.send('getAllUsers');
};

module.exports = {
  getAllUsers
};
