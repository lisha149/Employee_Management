//protect our api
function adminAuth(is_admin) {
  return (req, res, next) => {
    if (req.user.is_admin !== is_admin) {
      res.status(401);
      return res.send("Not allowed");
    }
  };
}
module.exports = adminAuth;
