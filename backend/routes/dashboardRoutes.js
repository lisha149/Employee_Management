var express = require("express");
var router = express.Router();
const Models = require("./../models");
const Department = Models.departments;
const User = Models.users;
const Profile = Models.profiles;
const { isAuth } = require("../middleware/authMiddleware");

router.get("/dashboard", isAuth, async (req, res, next) => {
  // department and employee count
  const departmentCount = await Department.count();
  const employeeCount = await User.count();
  const popupMessage = "Happy Birthday!!";

  var today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentDate = today.getDate();

  const user_id = req.user.id;
  req.profile = await Profile.findOne({ where: { user_id: user_id } });
  const date = new Date(req.profile.dob);
  const dobMonth = date.getMonth() + 1;
  //   console.log(dobMonth);
  const dobDate = date.getDate();
  //   console.log(req.profile.dob);
  const isYourBirthday = dobMonth == currentMonth && dobDate == currentDate;

  var todayDate = today.toLocaleDateString();

  if (isYourBirthday) {
    if (req.user.last_logged_in == null && employeeCount && departmentCount) {
      const user = await User.findOne({
        attributes: ["id", "last_logged_in"],
        where: {
          id: user_id,
        },
      });

      user.last_logged_in = today;
      await user.save();
      res.status(200).json({ departmentCount, employeeCount, popupMessage });
    } else if (todayDate == req.user.last_logged_in.toLocaleDateString()) {
      res.status(200).json({ employeeCount, departmentCount });
    } else {
      res.status(200).json({ employeeCount, departmentCount });
    }
  } else {
    res.status(200).json({ employeeCount, departmentCount });
  }
});

module.exports = router;
