
exports.AllUsers = async (req, res, next) => {
    res.status(200).json('all users')
}

exports.OneUser = async (req, res, next) => {
  res.status(200).json("one users");
};

exports.CreateUser = async (req, res, next) => {
  res.status(201).json("create user");
};