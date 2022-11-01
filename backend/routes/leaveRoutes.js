var express = require("express");
var router = express.Router();
const Models = require("./../models");
const Leave = Models.leaves;
const { isAdmin, isAuth } = require("../middleware/authMiddleware");
const EmailSender = require("../config/sendEmail");
router.post("/apply-leave", isAuth, async (req, res, next) => {
  let email = req.body.email;
  let reason = req.body.leave_reason;
  let start_date = req.body.start_date;
  let end_date = req.body.end_date;
  let user_id = req.body.user_id;
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
      email: created_leave.email,
      reason: created_leave.reason,
      start_date: created_leave.start_date,
      end_date: created_leave.end_date,
    });
  }
});

//Get all leaves by admin
router.get("/leave", isAdmin, async (req, res, next) => {
  const leaves = await Leave.findAll();
  res.json(leaves);
});
//Get leave by id
router.get("/leave/:id", async (req, res, next) => {
  const leave = await Leave.findByPk(req.params.id);

  if (leave) {
    res.json(leave);
  } else {
    res.status(404).json({ message: "Leave not found" });
  }
});

module.exports = router;
