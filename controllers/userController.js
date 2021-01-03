exports.adminBoard = (req, res) => {
  return res.status(200).send("Admin Content");
};

exports.restaurantAdminBoard = (req, res) => {
  res.status(200).send("Restaurant Admin Content");
};

exports.customerBoard = (req, res) => {
  res.status(200).send("Customer Content");
};

exports.delivererBoard = (req, res) => {
  res.status(200).send("Deliverer Content");
};
