const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = require("../config/db");
const bcrypt = require("bcryptjs");
const User = require("../model/user");

const data = {
  username: "user",
  password: "user@123",
};

const seedUser = async () => {
  try {
    await connectDB();

    const existingUser = await User.findOne({ name: data.username });
    if (existingUser) {
      console.log("User already exists:", existingUser);
      return;
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    const newUser = await User.create(data);
    console.log("User Created:", newUser);
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedUser();
