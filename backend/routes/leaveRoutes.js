var express = require("express");
var router = express.Router();
const Models = require("./../models");
const Leave = Models.leaves;
const User = Models.users;
const { isAdmin, isAuth } = require("../middleware/authMiddleware");
const EmailSender = require("../config/sendEmail");
const leaveRejected = require("../config/sendEmailToEmployee/Rejected");
const leaveApproved = require("../config/sendEmailToEmployee/Approved");
router.post("/leave", isAuth, async (req, res, next) => {
  let email = req.user.email;
  let reason = req.body.leave_reason;
  let start_date = req.body.start_date;
  let end_date = req.body.end_date;
  let user_id = req.user.id;
  if (reason == "" || start_date == "" || end_date == "") {
    res.status(400).json({ message: "Fields cannot be empty" });
  }
  var leaveData = {
    email,
    user_id,
    reason,
    start_date,
    end_date,
  };
  created_leave = await Leave.create(leaveData);
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
});

//Get all leaves
router.get("/leave", isAdmin, async (req, res, next) => {
  const leaves = await Leave.findAll();
  if (leaves) {
    res.json(leaves);
  } else {
    res.status(404).json({ message: "Leave not found" });
  }
});
//Get leave by id
router.get("/leave/:id", isAuth, async (req, res, next) => {
  const leave = await Leave.findByPk(req.params.id);

  if (leave) {
    res.json(leave);
  } else {
    res.status(404).json({ message: "Leave not found" });
  }
});
//Approved,Reject leave
router.patch("/leave/:id", isAdmin, async (req, res, next) => {
  const leave = await Leave.findByPk(req.params.id);
  req.leave = await User.findOne({ where: { id: leave.user_id } });
  console.log(req.leave.email);
  const status = req.body.status;
  const rejected_reason = req.body.rejected_reason;
  const email = req.leave.email;

  if (leave) {
    leave.status = status;
    leave.rejected_reason = rejected_reason;
    const updatedLeave = await leave.save();
    res.json(updatedLeave);
  } else {
    res.status(404).json({ message: "Leave not found" });
  }
  console.log(email);
  if (leave.status.toLowerCase() === "approved") {
    leaveApproved({ email, status });
  } else {
    leaveRejected({ email, status, rejected_reason });
  }
});

module.exports = router;
