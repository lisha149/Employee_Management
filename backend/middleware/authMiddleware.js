const jwt = require("jsonwebtoken");
const { where } = require("sequelize");
const { async } = require("validate.js");
const Models = require("../models");
const user = require("../models/user");
const User = Models.users;
require("dotenv").config();

//protect our api
const isAuth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findOne({ where: { id: decoded.id } });
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

//isadmin
const isAdmin = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      //decodes token id
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded) {
        let user = await User.findOne({
          where: { id: decoded.id, is_admin: true },
        });
        console.log(user);
        if (!user) {
          return res
            .status(401)
            .send({ message: "You are not authorize to perform this action" });
        }
        next();
      }
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

//isEmployee
const isEmployee = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      //decodes token id
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded) {
        let user = await User.findOne({
          where: { id: decoded.id, is_admin: false },
        });
        console.log(user);
        if (!user) {
          return res.status(401).send({
            message: " You are not authorize to perform this action",
          });
        }
        next();
      }
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

module.exports = { isAuth, isAdmin, isEmployee };