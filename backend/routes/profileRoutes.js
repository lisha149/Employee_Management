var express = require("express");
var router = express.Router();
const Models = require("./../models");
const Profile = Models.profiles;
const { isAuth } = require("../middleware/authMiddleware");
const generateToken = require("../utils/generateToken");
//Edit profile
router.put("/profile", isAuth, async (req, res, next) => {
  const {
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
  } = req.body;
  const profile = await Profile.findOne({ where: { user_id: req.user.id } });
  if (profile) {
    (profile.contact_number = contact_number || profile.contact_number),
      (profile.address = address || profile.address),
      (profile.dob = dob || profile.dob),
      (profile.citizenship_number =
        citizenship_number || profile.citizenship_number),
      (profile.pan_number = pan_number || profile.pan_number),
      (profile.bank_account = bank_account || profile.bank_account),
      (profile.bank_account_number =
        bank_account_number || profile.bank_account_number),
      (profile.gender = gender || profile.gender),
      (profile.marital_status = marital_status || profile.marital_status),
      (profile.profile_pic = profile_pic || profile.profile_pic);
    const updatedProfile = await profile.save();
    res.json({
      id: updatedProfile.id,
      user_id: updatedProfile.user_id,
      address: updatedProfile.address,
      contact_number: updatedProfile.contact_number,
      dob: updatedProfile.dob,
      citizenship_number: updatedProfile.citizenship_number,
      pan_number: updatedProfile.pan_number,
      bank_account: updatedProfile.bank_account,
      bank_account_number: updatedProfile.bank_account_number,
      gender: updatedProfile.gender,
      marital_status: updatedProfile.marital_status,
      profile_pic: updatedProfile.profile_pic,
      // token: generateToken(updatedProfile.user_id),
    });
  } else {
    res.status(404).json({ message: "Profile not found" });
  }
});

//Get profile by id
router.get("/profile/:id", isAuth, async (req, res, next) => {
  const profile = await Profile.findByPk(req.params.id);

  if (profile) {
    res.json(profile);
  } else {
    res.status(404).json({ message: "Profile not found" });
  }
});

//Get all profiles
router.get("/profiles", isAuth, async (req, res, next) => {
  const profiles = await Profile.findAll();
  res.json(profiles);
});

//Get my own profile
router.get("/profile", isAuth, async (req, res, next) => {
  console.log(req.user.id);
  const user_id = req.user.id;
  const profile = await Profile.findOne({ where: { user_id: user_id } });

  if (profile) {
    res.json(profile);
  } else {
    res.status(404).json({ message: "Profile not found" });
  }
});

module.exports = router;
