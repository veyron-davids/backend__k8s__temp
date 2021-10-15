const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      `${process.env.JWT_PRIVATE_KEY}`
    );
    req.currentUser = payload;
  } catch (err) {}
  next();
};
