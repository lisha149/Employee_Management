var express = require("express");
var moment = require("moment");
var router = express.Router();
const Models = require("./../models");
const Leave = Models.leaves;
const User = Models.users;
const { isAdmin, isAuth, isEmployee } = require("../middleware/authMiddleware");
const EmailSender = require("../config/sendEmail");
const leaveRejected = require("../config/sendEmailToEmployee/Rejected");
const leaveApproved = require("../config/sendEmailToEmployee/Approved");

//Apply Leave
router.post("/leave", isEmployee, async (req, res, next) => {
  let email = req.user.email;
  let reason = req.body.leave_reason;
  let start_date = req.body.start_date;
  let end_date = req.body.end_date;
  let user_id = req.user.id;
  let today = new Date();
  today = moment(today).format("YYYY-MM-DD");
  // console.log(today);
  if (reason == "" || start_date == "" || end_date == "") {
    res.status(400).json({ message: "Fields cannot be empty" });
  } else if (start_date < today) {
    res.status(400).json({ message: "Please provide valid start date" });
  } else if (end_date < start_date) {
    res.status(400).json({ message: "Please provide valid end date" });
  } else {
    var leaveData = {
      email,
      user_id,
      reason,
      start_date,
      end_date,
    };
    const created_leave = await Leave.create(leaveData);
    EmailSender({
      email,
      reason,
      start_date,
      end_date,
    });
    if (created_leave) {
      res.status(201).json({
        id: created_leave.id,
        user_id: created_leave.user_id,
        email: req.user.email,
        reason: created_leave.reason,
        start_date: created_leave.start_date,
        end_date: created_leave.end_date,
      });
    }
  }
});

//Get all leaves
router.get("/leaves", isAdmin, async (req, res, next) => {
  const leaves = await Leave.findAll();
  const users = await User.findAll();

  let employeeLeaveData = [];
  users.forEach((user) => {
    userData = user.dataValues;
    leaves.forEach((leave) => {
      leaveData = leave.dataValues;
      if (userData.id == leaveData.user_id) {
        employeeLeaveData.push({
          id: leaveData.id,
          user_id: userData.id,
          applicant_name: userData.first_name + " " + userData.last_name,
          reason: leaveData.reason,
          start_date: leaveData.start_date,
          end_date: leaveData.end_date,
          rejected_reason: leaveData.rejected_reason,
          status: leaveData.status,
        });
      }
    });
  });
  if (leaves) {
    res.json(userLeaveData);
  } else {
    res.status(404).json({ message: "Leave not found" });
  }
});

//Get leave by id
router.get("/leave/:id", isAdmin, async (req, res, next) => {
  const leave = await Leave.findByPk(req.params.id);
  if (leave) {
    res.json(leave);
  } else {
    res.status(404).json({ message: "Leave not found" });
  }
});

//Approved/Reject leave
router.patch("/leave/:id", isAdmin, async (req, res, next) => {
  const leave = await Leave.findByPk(req.params.id);
  req.leave = await User.findOne({ where: { id: leave.user_id } });
  // console.log(req.leave.email);
  const status = req.body.status;
  const rejected_reason = req.body.rejected_reason;
  const email = req.leave.email;

  if (leave) {
    leave.status = status;
    leave.rejected_reason = rejected_reason;
    if (leave.status == "Rejected" && leave.rejected_reason == "") {
      res.status(400).json({ message: "Please provide the rejected reason" });
    } else {
      const updatedLeave = await leave.save();
      res.json(updatedLeave);
    }
  } else {
    res.status(404).json({ message: "Leave not found" });
  }
  // console.log(email);
  if (leave.status.toLowerCase() === "approved") {
    leaveApproved({ email, status });
  } else {
    leaveRejected({ email, status, rejected_reason });
  }
});

//view own leave
router.get("/leave", isEmployee, async (req, res, next) => {
  // console.log(req.user.id);
  const user_id = req.user.id;
  const leave = await Leave.findAll({ where: { user_id: user_id } });

  if (leave) {
    res.json(leave);
  } else {
    res.status(404).json({ message: "Leave not found" });
  }
});
module.exports = router;
