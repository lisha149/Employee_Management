var express = require("express");
var router = express.Router();
const Models = require("./../models");
const Profile = Models.profiles;
const { isAuth, isAdmin } = require("../middleware/authMiddleware");
//Create
router.post("/profile", isAdmin, async (req, res, next) => {
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
  });
  if (profile) {
    res.status(201).json({
      id: profile.id,
      address: profile.address,
      contact_number: profile.contact_number,
      dob: profile.dob,
      citizenship_number: profile.contact_number,
      pan_number: profile.pan_number,
      bank_account: profile.bank_account,
      bank_account_number: profile.bank_account_number,
      gender: profile.gender,
      marital_status: profile.marital_status,
      profile_pic: profile.profile_pic,
      joined_date: profile.joined_date,
    });
  } else {
    res.status(400);
    throw new Error("Profile not found");
  }
});
router.get("/profile/:id", isAuth, async (req, res, next) => {
  const profile = await Profile.findByPk(req.params.id);

  if (profile) {
    res.json(profile);
  } else {
    res.status(404).json({ message: "Profile not found" });
  }
});

module.exports = router;
