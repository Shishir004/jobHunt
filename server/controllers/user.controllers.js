const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const registerUser = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;
    if (!fullName || !email || !phoneNumber || !password || !role) {
      return res
        .status(400)
        .json({ message: "something is missing", success: false });
    }
    const isemail = await User.findOne({ email });
    if (isemail) {
      return res
        .status(400)
        .json({
          message: "Email already exist with this email",
          success: false,
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });
    return res.status(200).json({ message: "user created successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).message(error);
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "please enter credentials", success: false });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "email do not exist", success: false });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "password do not match", success: false });
    }
    if (user.role !== role) {
      return res
        .status(400)
        .json({ message: "role do not match", success: false });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
    return res
      .status(200)
      .cookie("token", token, { httpOnly: true, sameSite: "strict" })
      .json({
        message: `WELCOME BACK${user.fullName}`,
        user,
        sucess: true,
      });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
const logOut = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "",{httpOnly:true, expires: new Date(0),sameSite: "strict", })
      .json({ message: "Logout successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
const updateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;
    // setting up file here using cloudinary
    let skillsArray;
    if (skillsArray) {
      skillsArray = skills.split(",");
    }
    const userId = req.id;
    let user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ message: "user not found", success: false });
    }
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.bio = bio;
    if (skills) user.skills = skillsArray;
    // resume here
    await user.save();
    return res.status(200).json({
      message: "Profile updated successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "failed to update data" });
  }
};
module.exports = { registerUser, loginUser, logOut, updateProfile };
