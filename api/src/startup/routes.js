const express = require("express");
require("express-async-errors");
const signin = require("../routes/signin");
const signup = require("../routes/signup");
const reset = require("../routes/reset");
const currentUser = require("../routes/currentUser");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/users", signin);
  app.use("/api/users", signup);
  app.use("/api/users", reset);
  app.use("/api/users", currentUser);
  app.use("/public", express.static("public"));
  app.all("*", async (req, res) => {
    throw new Error({ message: "Path not found" });
  });
};
