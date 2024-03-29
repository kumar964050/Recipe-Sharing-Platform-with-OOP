const User = require("../models/User");

class UserController {
  // register a new user
  async register(req, res, next) {
    try {
      const { username, password } = req.body;

      if (!(username && password)) {
        return res.status(400).json({
          msg: "Please enter a username & password",
        });
      }
      const user = new User(username, password);
      const result = await user.save();

      result.password = undefined;
      res.status(201).json({
        msg: "User created successfully",
        user: result,
      });
    } catch (error) {
      next(
        res.status(500).json({
          msg: error.message,
        })
      );
    }
  }
  // login a user
  async login(req, res, next) {
    try {
      const { username, password } = req.body;

      if (!(username && password)) {
        return res.status(400).json({
          msg: "Please enter a username & password",
        });
      }
      const user = new User(username, password);
      const result = await user.authenticate();
      result.password = undefined;
      res.status(201).json({
        msg: "User created successfully",
        user: result,
        token: user.generateJwtToken(),
      });
    } catch (error) {
      next(
        res.status(500).json({
          msg: error.message,
        })
      );
    }
  }
  // my profile
  async profile(req, res, next) {
    try {
      const user = req.user;
      user.password = undefined;
      res.status(200).json({
        user: user,
        msg: "success",
      });
    } catch (error) {
      next(
        res.status(500).json({
          msg: error.message,
        })
      );
    }
  }
  // update my profile
  async updateProfile(req, res, next) {
    try {
      const { username, password } = req.body;

      // setting previous values
      const user = new User(req.user.username, req.user.password);

      if (!username && !password) {
        return res
          .status(400)
          .json({ msg: "Please provide username or password" });
      }

      if (username) await user.updateUsername(username);
      if (password) await user.updatePassword(password);
      res.status(201).json({
        msg: "update successfully",
      });
    } catch (error) {
      next(
        res.status(500).json({
          msg: error.message,
        })
      );
    }
  }
  // delete my profile
  async deleteProfile(req, res, next) {
    try {
      const user = new User(req.user.username);
      user.deleteUser();
      res.status(200).json({
        msg: "delete successfully",
      });
    } catch (error) {
      next(
        res.status(500).json({
          msg: error.message,
        })
      );
    }
  }
}

module.exports = new UserController();
