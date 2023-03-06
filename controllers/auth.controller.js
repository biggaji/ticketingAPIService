const authModel = require("../models/auth.model");
const bcrypt = require("bcryptjs");
const { ValidationException, AuthForbiddenException } = require("../@helpers/errorHandlers");

async function register(req, res, next) {
  const { username, password } = req.body;
  try {

    if(!username || !password) {
      throw new ValidationException("username and password are required", 400);
    }

    const user = await authModel.findOne({ username: username.toLowerCase() }).exec();
  
    if(!user) {
      // continue registartion
      // hash password
      const hashPassword = await bcrypt.hash(password, 10);

      const newAuth = new authModel({
        username,
        pwd: hashPassword
      });

      await newAuth.save();

      const { pwd , ...results } = newAuth._doc;
      
      res.status(201).json({
        status: "success",
        message: "User created",
        data: results
      });
    } else {
      throw new AuthForbiddenException("user already exist", 403);
    }
  } catch(error) {
    next(error);
  }
}

async function login(req, res, next) {
  const { username, password } = req.body;

  
}

module.exports = {
  register, login
}