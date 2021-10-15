const jwt = require("jsonwebtoken");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    trim: true,
  },
  LastName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      FirstName: this.FirstName,
      LastName: this.LastName,
      email: this.email,
    },
    `${process.env.JWT_PRIVATE_KEY}`
    // { expiresIn: "5s" }
  );
  return token;
};

const User = mongoose.model("User", userSchema);
module.exports = { User };
