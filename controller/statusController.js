const status = require("../model/status");

exports.setStatus = async (req, res) => {
  try {
    const {
      userName,
      EmployeeName,
      monthOfWork,
      clockIn,
      clockOut,
      halfDays,
      regularizations,
      totalHours,
      holidays,
    } = req.body;
    const dataIn = clockIn
    console.log(dataIn)
    const statusSet = await status.create({
      userName,
      EmployeeName,
      monthOfWork,
      clockIn,
      clockOut,
      halfDays,
      regularizations,
      totalHours,
      holidays,
    });
    // const statusCheck = await status.find({ name: name });
    // if (statusCheck) {
    //   res.status(400).json({ message: "Status Already exists !", statusCheck });
    //   return;
    // }
    if (!statusSet) {
      res.status(400).json({ message: "Try Again !" });
      return;
    }
    if (statusSet) {
      await statusSet.save();
      res
        .status(200)
        .json({ message: "Status Created Successfully !", statusSet });
      return;
    }
  } catch (error) {
    res.status(400).json({ message: "Something went Wrong !", error });
    console.log(error)
  }
};

exports.getStatus = async (req, res) => {
  try {
    const statusGet = await status.find().populate("name").populate("user");
    if (!statusGet) {
      res.status(400).json({ message: "Try Again !" });
      return;
    }
    if (statusGet) {
      res.status(200).json({ message: "Status Found !", statusGet });
      return;
    }
  } catch (error) {
    res.status(400).json({ message: "Something went Wrong !", error });
  }
};

exports.getByIdStatus = async (req, res) => {
  try {
    const statusGetById = await status.findById(req.params.id).populate("name");
    if (!statusGetById) {
      res.status(400).json({ message: "Try Again !" });
      return;
    }
    if (statusGetById) {
      res.status(200).json({ message: "Status Found !", statusGetById });
      return;
    }
  } catch (error) {
    res.status(400).json({ message: "Something went Wrong !", error });
  }
};


// mail 
//clock in and clockout

exports.updateStatus = async (req, res) => {
  try {
    
    const {
      userName,
      monthOfWork,
      clockIn,
      clockOut,
      halfDays,
      regularizations,
      totalHours,
      holidays,
    } = req.body;
    
    const statusUpdate = await status.findByIdAndUpdate(req.params.id, {
      userName,
      monthOfWork,
      clockIn,
      clockOut,
      halfDays,
      regularizations,
      totalHours,
      holidays,
    }, { new: true });

    if (!statusUpdate) {
      res.status(400).json({ message: "Try Again !" });
      return;
    }

    let stored = statusUpdate.createdAt

    let now = statusUpdate.updatedAt

    const minutes = (new Date(now).getTime() - new Date(stored).getTime()) / 1000 / 60;

    let count = Math.floor(minutes)
    console.log(Math.floor(minutes));

    if (statusUpdate) {
      const updatetotalhours = await status.findByIdAndUpdate(req.params.id, {
        totalHours: count
      }, { new: true })

      res.status(200).json({ message: "Status Updated", updatetotalhours });
      return;
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: "Something went Wrong !", error });
  }
};

exports.deleteStatus = async (req, res) => {
  try {
    const statusDelete = status.findByIdAndDelete(req.params.id);
    if (!statusDelete) {
      res.status(400).json({ message: "Try Again !" });
      return;
    }
    if (statusDelete) {
      res.status(200).json({ message: "Status Deleted !" });
      return;
    }
  } catch (error) {
    res.status(400).json({ message: "Something went Wrong !", error });
  }
};

exports.clockInStatus = async (req, res) => {
  try {
    const { clockIn } = req.body;
    const statusCLockIn = status.findByIdAndUpdate(req.params.id, {
      clockIn,
    });
    if (!statusCLockIn) {
      res.status(400).json({ message: "Try Again !" });
      return;
    }
    if (statusCLockIn) {
      res.status(200).json({ message: "User Clocked In, Welcome !", statusCLockIn });
      return;
    }
  } catch (error) {
    res.status(400).json({ message: "Something went Wrong !", error });
  }
};

exports.clockOutStatus = async (req, res) => {
  try {
    const { clockOut } = req.body;
    const statusCLockOut = status.findByIdAndUpdate(req.params.id, {
      clockOut,
    });
    if (!statusCLockOut) {
      res.status(400).json({ message: "Try Again !" });
      return;
    }
    if (statusCLockOut) {
      res
        .status(200)
        .json({ message: "User Clocked Out, See you Tomorrow !", statusCLockOut });
      return;
    }
  } catch (error) {
    res.status(400).json({ message: "Something went Wrong !", error });
  }
};
