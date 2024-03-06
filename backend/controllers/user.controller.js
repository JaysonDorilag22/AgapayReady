import User from "../models/user.model.js";
import Department from "../models/department.model.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import cloudinary from "cloudinary";
import { errorHandler } from "../utils/error.js";
import dotenv from "dotenv";
import transporter from "../utils/transporter.js";

dotenv.config();

export const register = async (req, res, next) => {
  const { firstname, lastname, email, password, departmentId } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 12);

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already taken" });
    }

    const confirmationToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const { path } = req.file; 
    const result = await cloudinary.uploader.upload(path);
    const avatarUrl = result.secure_url;

    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      department: departmentId,
      avatar: avatarUrl,
      isConfirmed: false,
      emailConfirmationToken: confirmationToken,
    });

    const savedUser = await newUser.save(); 

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Confirmation",
      html: `<p>Please click <a href="http://localhost:5173/email-confirm/${savedUser.id}/${confirmationToken}">here</a> to confirm your email.</p>`,
    });

    // Respond with success message
    res.status(201).json({
      message: "A confirmation email has been sent. Please check your email to confirm your registration.",
    });
    
  } catch (error) {
    console.error("Registration failed:", error);
    res.status(500).json({ error: "Registration failed. Please try again later." });
  }
};



export const confirmEmail = async (req, res, next) => {
  const { userId, token } = req.params; // Separate user ID and token

  try {
    const user = await User.findById(userId); // Find user by ID
    if (!user || user.emailConfirmationToken !== token) { // Check if user or token is invalid
      return res.status(404).json({ error: "Invalid confirmation link" });
    }

    // Update user confirmation status
    user.isConfirmed = true;
    await user.save();

    // res.redirect(`${process.env.CLIENT_URL}/login`);
  } catch (error) {
    errorHandler(error);
    res.status(400).json({ error: "Invalid or expired token" });
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not found!'));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));

    const token = jwt.sign({ id: validUser._id, role: validUser.role }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;

    // Set the token in a cookie and send it back to the client
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json({ ...rest, role: validUser.role }); 
  } catch (error) {
    next(error);
  }
};



export const updateUser = async (req, res, next) => {
  const userId = req.user.id; 
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

    res
      .status(200)
      .json({ message: "User information updated successfully", user });
  } catch (error) {
    errorHandler(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    // Clear the access_token cookie
    res.clearCookie("access_token", { httpOnly: true });
    
    // Respond with a success message
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error); // Pass any error to the error handler middleware
  }
};

