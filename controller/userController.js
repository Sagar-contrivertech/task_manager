const express = require("express");
const user = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Leaves = require("../model/leaves")
//
const cloudinary = require('cloudinary').v2

const sendEmail = require('../middleware/sendmail')

exports.registerUser = async (req, res) => {
  try {
    const findUsers = await user.findOne({ email: req.body.email });
    if (findUsers) {
      res
        .status(401)
        .json({ message: "user with same email already registered" });
      return;
    }
    // cloundniary for documnets 

    const result = await cloudinary.uploader.upload(req.body.documents, {
      folder: 'contrivertech_docs',
      width: 150,
      crop: "scale"
    })

    console.log(result)

    //
    const { firstName, lastName, email, password, employeeName, salary, designation, joiningDate, documents, role, Permissions } = req.body;

    const users = await user.create({
      firstName,
      lastName,
      email,
      password, employeeName, salary, designation, joiningDate,
      documents: {
        public_id: result.public_id,
        url: result.secure_url
      },
      role,
      Permissions
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

    const message = `you have been success fully registerd for contrivertech ,`
    if (users) {
      await users.save();
      // send mail to users while regustrations 

      await sendEmail({
        email: req.body.email,
        subject: `you have been succefully registed with contrivertech`,
        message
      })

      //
      res.status(200).json({ message: "User Registered !", users, token });
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
    const { firstName, lastName, email, password, role, Permissions } = req.body;
    const users = await user.findById(req.params.id);
    if (!users) {
      res.status(400).json({ message: "User not found !" });
      return;
    }
    const updateUsers = await user.findByIdAndUpdate(
      req.params.id,
      {
        firstName,
        lastName,
        email,
        employeeName, salary, designation, joiningDate, documents,
        role,
        Permissions
      },
      { new: true }
    );
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      updateUsers.password = passwordHash;
      await user.findByIdAndUpdate(req.params.id, {
        password: passwordHash,
      });
    }
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
    console.log(error);
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


//mail need to be intgeretd
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await user.findOne({ email: req.body.email });
    console.log(users)
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
        users,
        token,
      });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong", error });
  }
};


// add leaves is 
exports.addleaves = async (req, res) => {
  try {
    const LeavesData = await Leaves.create({
      name: req.body.name,
      paidLeaves: req.body.paidLeaves,
      unPaidLeaves: req.body.unPaidLeaves,
      sickleave: req.body.sickleave,
    });
    await LeavesData.save();
    let id = LeavesData.name;
    console.log(LeavesData, "jk");
    if (LeavesData.name) {

      let ct = await user.findByIdAndUpdate(
        id,
        {
          $push: {
            "hoildays": {
              paidLeaves: LeavesData.paidLeaves,
              unPaidLeaves: LeavesData.unPaidLeaves,
              sickleave: LeavesData.sickleave,
              leaves: LeavesData._id,
            },
          },
        },
        {
          new: true,
        }
      );
      console.log(ct);

      res
        .status(200)
        .json({ message: "leaves for employee added", LeavesData });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "someting went wrong !", err });
  }
};
