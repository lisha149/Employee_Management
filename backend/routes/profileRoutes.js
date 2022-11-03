var express = require("express");
var router = express.Router();
const Models = require("./../models");
const Profile = Models.profiles;
const { isAuth } = require("../middleware/authMiddleware");
//Edit profile
router.put("/employee/:id", isAuth, async (req, res, next) => {
  const {
    id,
    email,
    address,
    contact_number,
    dob,
    citizenship_number,
    pan_number,
    bank_account,
    bank_account_number,
    gender,
    marital_status,
    profile_pic,
    joined_date,
  } = req.body;

  const profile = await Profile.findByPk(req.params.id);
  if (profile) {
    (profile.first_name = first_name),
      (profile.last_name = last_name),
      (employee.department_id = department_id),
      (employee.status = status);
    const updatedEmployee = await employee.save();
    res.json(updatedEmployee);
  } else {
    res.status(404).json({ message: "Employee not found" });
  }
});

module.exports = router;
