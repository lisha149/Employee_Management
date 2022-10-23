var express = require("express");
var router = express.Router();
const Models = require("./../models");
const Leave = Models.leaves;

router.post("/apply-leave", async (req, res, next) => {
  var leaveData = {
    reason: req.body.leave_reason,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
  };
  created_leave = await Leave.create(leaveData);
  res.status(201).json(created_leave);
});

module.exports = router;
