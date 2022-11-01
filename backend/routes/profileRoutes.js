var express = require("express");
var router = express.Router();
const Models = require("./../models");
const Profile = Models.profiles;
const User = Models.users;
const { isAuth, isAdmin } = require("../middleware/authMiddleware");
//Create
router.post("/user", isAdmin, async (req, res, next) => {
  try {
    let checkUser = await Profile.findOne({
      where: {
        user_id: req.user.id,
      },
    });
    if (checkUser)
      return res.status(404).json({ message: "Profile already exists" });
    const {
      id,
      user_id,
      first_name,
      last_name,
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
    const profile = await Profile.create({
      id,
      user_id: req.user.id,
      first_name,
      last_name,
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
    });
    res.status(201).json({
      profile,
      message: "Details uploaded successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
