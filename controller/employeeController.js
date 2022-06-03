const express = require("express");
const employee = require("../model/employee");
const Leaves = require("../model/leaves");

exports.employeeRegister = async (req, res) => {
  try {
    const { employeeName, salary, designation, joiningDate, documents } =
      req.body;
    const employeeReg = await employee.create({
      employeeName,
      salary,
      designation,
      joiningDate,
      documents,
    });
    if (!employeeReg) {
      res.status(400).json({ message: "Employee not Registered" });
      return;
    }
    if (employeeReg) {
      await employeeReg.save();
      res.status(200).json({ message: "Employee Registeren", employeeReg });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong !", error });
  }
};

exports.getEmploy = async (req, res) => {
  try {
    const employeeGet = await employee.find().populate("employeeName").exec();
    if (!employeeGet) {
      res.status(400).json({ message: "Try again !" });
      return;
    }
    if (employeeGet) {
      res.status(200).json({ message: "Employee Found !", employeeGet });
      return;
    }
  } catch (error) {
    res.status(400).json({ message: "Something Went Wrong !", error });
    console.log(error);
  }
};

exports.getEmployById = async (res, req) => {
  try {
    const employeebyId = await employee
      .findById(req.params.id)
      .populate("employeeName")
      .select("+password");
    if (!employeebyId) {
      res.status(400).json({ message: "Try again !" });
      return;
    }
    if (employeebyId) {
      res.status(200).json({ message: "Employee Found !", employeebyId });
      return;
    }
  } catch (error) {
    res.status(400).json({ message: "Something Went Wrong !", error });
  }
};

exports.updateById = async (req, res) => {
  try {
    const { employeeName, salary, designation, joiningDate, documents } =
      req.body;
    const employeebyIdUp = await employee.findByIdAndUpdate(req.params.id, {
      employeeName,
      salary,
      designation,
      joiningDate,
      documents,
    });
    if (!employeebyIdUp) {
      res.status(400).json({ message: "Try again !" });
      return;
    }
    if (employeebyIdUp) {
      await employeebyIdUp.save();
      res.status(200).json({ message: "Employee Updated !", employeebyIdUp });
      return;
    }
  } catch (error) {
    res.status(400).json({ message: "Something Went Wrong !", error });
  }
};

exports.deleteById = async (res, req) => {
  try {
    const emplpyDel = await employee.findByIdAndDelete(req.params.id);
    if (!emplpyDel) {
      res.status(400).json({ message: "Try again !" });
      return;
    }
    if (emplpyDel) {
      res.status(200).json({ message: "Employee Updated !", employeebyIdUp });
      return;
    }
  } catch (error) {
    res.status(400).json({ message: "Something Went Wrong !", error });
  }
};

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
      let ct = await employee.updateOne(
        { id },
        {
          $push: {
            hoildays: {
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
