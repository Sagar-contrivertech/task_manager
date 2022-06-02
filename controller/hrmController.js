const express = require("express");
const hrm = require("../model/hrm");

exports.hrmReg = async (req, res) => {
  try {
    const { name, salaryOfMOnth, holiday, monthWorked, workedDays, halfDays } =
      req.body;
    const createHrm = await hrm.create({
      name,
      salaryOfMOnth,
      holiday,
      monthWorked,
      workedDays,
      halfDays,
    });
    if (!createHrm) {
      res.status(400).json({ message: "Try Again !" });
      return;
    }
    if (createHrm) {
      createHrm.save();
      res.status(200).json({ message: "Hrm Created!", createHrm });
      return;
    }
  } catch (error) {
    res.status(401).json({ message: "Something Went Wrong !" }, error);
    console.log(error);
  }
};

exports.hrmGet = async (req, res) => {
  try {
    const getHrm = hrm.find();
    if (!getHrm) {
      res.status(400).json({ message: "Try Again !" });
      return;
    }
    if (getHrm) {
      res.status(200).json({ message: "Hrms Found!", getHrm });
      return;
    }
  } catch (error) {
    res.status(401).json({ message: "Something Went Wrong !" }, error);
    console.log(error);
  }
};

exports.getHrmId = async (req, res) => {
  try {
    const getHrmId = hrm.findById(req.params.id)
    if (!getHrmId) {
      res.status(400).json({ message: "Try Again !" });
      return;
    }
    if (getHrmId) {
      res.status(200).json({ message: "Hrm Found!", getHrmId });
      return;
    }
  } catch (error) {
    res.status(401).json({ message: "Something Went Wrong !" }, error);
    console.log(error);
  }
}

exports.updateHrm = async (req, res) => {
  try {
    const hrmUpdate = hrm.findByIdAndUpdate(req.params.id,{
      name,
      salaryOfMOnth,
      holiday,
      monthWorked,
      workedDays,
      halfDays,
    })
    if (!hrmUpdate) {
      res.status(400).json({ message: "Try Again !" });
      return;
    }
    if (hrmUpdate) {
      res.status(200).json({ message: "Hrm Updated!", hrmUpdate });
      return;
    }
  } catch (error) {
    res.status(401).json({ message: "Something Went Wrong !" }, error);
    console.log(error);
  }
}

exports.deleteHrm = async (req, res) => {
  try {
    const hrmDelete = hrm.findByIdAndDelete(req.params.id)
    if (!hrmDelete) {
      res.status(400).json({ message: "Try Again !" });
      return;
    }
    if (hrmDelete) {
      res.status(200).json({ message: "Hrm Updated!", hrmDelete });
      return;
    }
  } catch (error) {
    res.status(401).json({ message: "Something Went Wrong !" }, error);
    console.log(error);
  }
}