var express = require("express");
var router = express.Router();
const Models = require("./../models");
const Department = Models.departments;

router.post("/add-dept", async (req, res, next) => {
  var dept = {
    // dept_id: req.body.dept_id,
    dept_title: req.body.dept_title,
  };
  created_department = await Department.create(dept);
  res.status(201).json(created_department);
});

module.exports = router;
