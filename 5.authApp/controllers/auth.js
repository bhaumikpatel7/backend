const bcrypt = require("bcrypt");
const User = require("../models/User");

//sign up rote handler

exports.signup = async (req, res) => {
  try {
    //get data
    const { name, email, password, role } = req.body;
    //check if user already exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        sucess: false,
        message: "User already Exists",
      });
    }
    //secure password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      res.status(500).json({
        sucess: false,
        message: "error is hashing password",
      });
    }

    // create entry for user

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(200).json({
      sucess: true,
      message: "user created sucessfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
        sucess:false,
        message: "user can not created sucessfully"
,
    })
  }
};
