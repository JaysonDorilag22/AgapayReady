import User from "../models/user.model.js";
import Department from "../models/department.model.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import cloudinary from "cloudinary";
import { errorHandler } from '../utils/error.js';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req, res, next) => {
  const { firstname, lastname, email, password, departmentId } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 12);

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already taken" });
    }

    let avatarUrl;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      avatarUrl = result.secure_url;
    }

    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }

    const newUser = new User({
      firstname,
      lastname,
      email, 
      password: hashedPassword,
      avatar: avatarUrl,
      department: departmentId
    });
    await newUser.save();

    res.status(201).json("Successfully created a User");
  } catch (error) {
    errorHandler(error);
  }
};


//login

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not found!'));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));

    const token = jwt.sign({ id: validUser._id, role: validUser.role }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;

    console.log("Generated token:", token); // Add this line to log the token

    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json({ ...rest, role: validUser.role }); 
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const userId = req.user.id; // Assuming you have middleware to extract user ID from JWT token
  const { firstname, lastname, email, password, departmentId } = req.body;

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // If email is being updated, check if the new email is not already taken
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email is already taken" });
      }
    }

    // Update user information
    if (firstname) user.firstname = firstname;
    if (lastname) user.lastname = lastname;
    if (email) user.email = email;
    if (password) {
      const hashedPassword = bcryptjs.hashSync(password, 12);
      user.password = hashedPassword;
    }
    if (departmentId) {
      const department = await Department.findById(departmentId);
      if (!department) {
        return res.status(404).json({ error: "Department not found" });
      }
      user.department = departmentId;
    }

    // Save updated user information
    await user.save();

    res.status(200).json({ message: "User information updated successfully", user });
  } catch (error) {
    errorHandler(error);
  }
};



export const logout = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json('User has been logged out!');
  } catch (error) {
    errorHandler(error);
  }
};

