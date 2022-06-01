const express = require("express");
const user = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    const findUsers = await user.findOne({ email: req.body.email });
    if (findUsers) {
      res
        .status(401)
        .json({ message: "user with same email already registered" });
      return;
    }
    const users = await user.create({
      firstName,
      lastName,
      email,
      password,
      role,
    });
    const salt = await bcrypt.genSalt(10);
    users.password = await bcrypt.hash(users.password, salt);
    const token = jwt.sign({ id: users.id }, process.env.tokenKey, {
      expiresIn: "7d",
    });
    users.token = token;
    if (!users) {
      res.status(400).json({ message: "Cannot Create User, try Again !" });
      return;
    }
    if (users) {
      await users.save();
      res.status(200).json({ message: "User Registered !", users });
      return;
    }
  } catch (error) {
    res.status(400).json({ message: "Something Went Wrong !", error });
    console.log(error);
  }
};

exports.getUser = async (req, res) => {
  try {
    const users = await user.find();
    if (!users) {
      res.status(400).json({ message: "User not found !" });
      return;
    }
    if (users) {
      res.status(200).json({ message: "User Found!", users });
      return;
    }
  } catch (error) {
    res.status(400).json({ message: "Something Went Wrong !", error });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const users = await user.findById(req.params.id);
    if (!users) {
      res.status(400).json({ message: "User not found !" });
      return;
    }
    if (users) {
      res.status(200).json({ message: "User found !", users });
      return;
    }
  } catch (error) {
    res.status(400).json({ message: "Something Went Wrong !", error });
  }
};

exports.updateUserById = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    const users = await user.findById(req.params.id);
    if (!users) {
      res.status(400).json({ message: "User not found !" });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    const updateUsers = await user.findByIdAndUpdate(
      req.params.id,
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        role: role,
      },
      { new: true }
    );
    if (!updateUsers) {
      res.status(400).json({ message: "User not updated !" });
      return;
    }
    if (updateUsers) {
      res.status(400).json({ message: "User updated !", updateUsers });
      return;
    }
  } catch (error) {
    res.status(400).json({ message: "Something Went Wrong !", error });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const users = await user.findById(req.params.id);
    if (!users) {
      res.status(400).json({ message: "User not found !" });
      return;
    }
    const deleteUser = await user.findByIdAndDelete(req.params.id);
    if (!deleteUser) {
      res.status(400).json({ message: "User not Delete !" });
      return;
    }
    if (deleteUser) {
      res.status(400).json({ message: "User Deleted !" });
      return;
    }
  } catch (error) {
    res.status(400).json({ message: "Something Went Wrong !", error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await user.findOne({email : email});
    if (!users) {
      res.status(400).json({ message: "User not found !" });
      return;
    }
    const validpassword = await bcrypt.compare(password, users.password);
    if (!validpassword) {
      res.status(400).json({ message: "password wrong" });
      return;
    }
    if (validpassword) {

      const token = jwt.sign({ id: users.id }, process.env.tokenKey, {
        expiresIn: "7d",
      });
      // users.token = token;

      res.status(200).json({
        message: "User Authenticated",
        users  , token
      });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong", error });
  }
};
