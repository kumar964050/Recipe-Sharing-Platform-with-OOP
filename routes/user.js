const routes = require("express").Router();

const authenticate = require("../middlewares/Auth");
const {
  register,
  login,
  profile,
  deleteProfile,
  updateProfile,
} = require("../controllers/user");

routes.route("/register").post(register);
routes.route("/login").post(login);
routes
  .route("/profile")
  .get(authenticate, profile)
  .put(authenticate, updateProfile)
  .delete(authenticate, deleteProfile);

module.exports = routes;
