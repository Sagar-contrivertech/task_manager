const express = require("express");
const hrm = require("../model/hrm");
// const user = require("../model/user");
const User = require('../model/user');

exports.hrmReg = async (req, res) => {
  try {
    const { name, Leave ,salaryOfMOnth, monthWorked, workedDays, halfDays } =req.body;

    // const findEmploy = await User.findById(name);
    // console.log(findEmploy)
    // if (!findEmploy) {
    //   res.status(400).json({message : "User is not found with this id"});
    //   return
    // }
    
    // let data;
    // if (findEmploy) {
    //   let pl = findEmploy.hoildays.paidLeaves[0];
    //   let ul = findEmploy.hoildays.unPaidLeaves[0];
    //   let {name , monthWorked , holiday} = req.body;
    //   if (pl === 0) {
    //     ul = ul + holiday;
    //     console.log("Unpaidleaves is" + ul)
    //     const users = await User.findByIdAndUpdate(name , {
    //       hoildays: {
    //         paidLeaves: pl,
    //         unPaidLeaves: ul,
    //         sickleave : 1
    //       },
    //     } , {new : true})

    //     console.log(users)
    //     if (!users) {
    //       res.status(400).json({message : "This is not possible for updating leaves"})
    //       return
    //     }
        
    //     if (users) {
    //       res.status(400).json({message : "This is possible for updating leaves" , users})
    //       return 
    //     }

    // }else if(pl > 0){
    //     pl = pl - holiday;

    //     const users = await User.findByIdAndUpdate(name , {
    //       hoildays: {
    //         paidLeaves: pl,
    //         unPaidLeaves: ul,
    //         sickleave : 1
    //       },
    //     } , {new : true})

    //     console.log(users)
    //     if (!users) {
    //       res.status(400).json({message : "This is not possible for updating leaves"})
    //       return
    //     }
        
    //     if (users) {
    //       res.status(400).json({message : "This is possible for updating leaves" , users})
    //       return 
    //     }
    //   }
      // console.log(paidLeaves , unPaidLeaves , sickleave)
      // console.log(findEmploy.hoildays.paidLeaves ,findEmploy.hoildays.unPaidLeaves ,  findEmploy.hoildays.sickleave );
      
      console.log(name ,salaryOfMOnth, monthWorked, workedDays, halfDays );
    const createHrm = await hrm.create({
      name,
      Leave,
      salaryOfMOnth,
      monthWorked,
      workedDays,
      halfDays,
    });
    console.log(createHrm)
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
    console.log(error);
    res.status(401).json({ message: "Something Went Wrong !"  , error});
  }

};

exports.hrmGet = async (req, res) => {
  try {
    const getHrm = await hrm.find().populate("Leave").populate("name");
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
    const {
      name,
      salaryOfMOnth,
      holiday,
      monthWorked,
      workedDays,
      halfDays,
     } = req.body
    const hrmUpdate = hrm.findByIdAndUpdate(req.params.id, {
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