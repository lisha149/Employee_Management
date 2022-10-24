var express = require("express");
var router = express.Router();
const Models = require("./../models");
const Leave = Models.leaves;

router.post("/apply-for-leave", async (req, res, next) => {
  var leaveData = {
    user_id: req.body.user_id,
    reason: req.body.leave_reason,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
  };
  created_leave = await Leave.create(leaveData);
  if (created_leave) {
    res.status(201).json({
      id: created_leave.id,
      reason: created_leave.reason,
      start_date: created_leave.start_date,
      end_date: created_leave.end_date,
      user_id: created_leave.user_id,
    });
  }
});

//Get all leaves by admin
router.get("/leave", async (req, res, next) => {
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
//Get leave by userid
// router.get("/leave/:user_id", async (req, res, next) => {
//   const leave = await Leave.findByFk(req.params.user_id);

//   if (leave) {
//     res.json(leave);
//   } else {
//     res.status(404).json({ message: "Leave not found" });
//   }
// });

module.exports = router;
