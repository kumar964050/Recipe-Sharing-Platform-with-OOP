// src/models/User.js
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const userModel = mongoose.model("User", userSchema);

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
  // register
  async save() {
    try {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      const isExistUsername = await userModel.findOne({
        username: this.username,
      });
      if (isExistUsername) {
        throw new Error(`User ${this.username} already exists`);
      }
      const newUser = await userModel.create({
        username: this.username,
        password: hashedPassword,
      });
      return newUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  // login
  async authenticate() {
    try {
      const user = await userModel.findOne({ username: this.username });
      if (!user) throw new Error("User not found");
      const comparePassword = await bcrypt.compare(
        this.password,
        user.password
      );
      if (!comparePassword) throw new Error("Invalid password");
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  // create jwt token
  generateJwtToken() {
    try {
      const token = jwt.sign(
        { username: this.username },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRE,
        }
      );
      return token;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  //   verify jwt token
  async verifyJwtToken(token) {
    try {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      return await userModel.findOne({ username: decoded.username });
    } catch (error) {
      throw new Error(error.message);
    }
  }
  //   update username
  async updateUsername(newUsername) {
    try {
      const isExistUsername = await userModel.findOne({
        username: newUsername,
      });
      if (isExistUsername) {
        throw new Error(`User ${newUsername} already exists`);
      }
      await userModel.updateOne(
        { username: this.username },
        { username: newUsername }
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async updatePassword(newPassword) {
    try {
      const hashedPass = await bcrypt.hash(newPassword, 10);
      await userModel.updateOne(
        { username: this.username },
        { password: hashedPass }
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async deleteUser() {
    try {
      await userModel.deleteOne({ username: this.username });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = User;
