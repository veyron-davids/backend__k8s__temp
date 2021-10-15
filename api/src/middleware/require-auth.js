module.exports = function (req, res, next) {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  next();
};
