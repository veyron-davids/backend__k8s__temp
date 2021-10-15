const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User } = require("../models/user");

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-Mail address already exists!");
          }
        });
      })
      .normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    //  .isEmpty(),
    body("FirstName")
      .trim()
      .not()
      .isEmpty()
      .withMessage("This field is required"),
    body("LastName")
      .trim()
      .not()
      .isEmpty()
      .withMessage("This field is required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new Error("Validation failed.");
        error.statusCode = 422;
        error.data = errors.array();
        res.send(errors);
        return;
      }
      let user = new User(
        _.pick(req.body, ["FirstName", "LastName", "email", "password"])
      );
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      await user.save();

      const token = user.generateAuthToken();
      req.session.jwt = token;
      res.status(201).send(user);
    } catch (err) {}
  }
);

module.exports = router;
