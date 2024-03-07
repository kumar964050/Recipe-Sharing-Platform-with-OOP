const User = require("../models/User");
const authenticate = async (req, res, next) => {
  try {
    let token;
    if (req.headers["authorization"]) {
      token = req.headers["authorization"].split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({ msg: "No token provided" });
    }
    const userObj = new User();
    // verify and get user object
    const user = await userObj.verifyJwtToken(token);
    if (!user) return res.status(400).json({ msg: "No user found" });
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = authenticate;
