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
      html: `<p>Please click for vercel <a href="https://agapay-ready.vercel.app/email-confirm/${savedUser.id}/${confirmationToken}">here</a> to confirm your email.</p>`,
      html: `<p>Please click for localhost <a href="http://localhost:5173/email-confirm/${savedUser.id}/${confirmationToken}">here</a> to confirm your email.</p>`,

    });
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
  const { firstname, lastname, email, password, departmentId, phoneNumber } = req.body;
  let { avatar, coverPhoto } = req.body; 

  try {
    const user = await User.findById(userId).populate('department');
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email is already taken" });
      }
    }

    if (firstname) user.firstname = firstname;
    if (lastname) user.lastname = lastname;
    if (avatar) {
      const result = await cloudinary.uploader.upload(avatar);
      user.avatar = result.secure_url;
    }
    if (coverPhoto) {
      const result = await cloudinary.uploader.upload(coverPhoto);
      user.coverPhoto = result.secure_url;
    }
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
    if (phoneNumber) user.phoneNumber = phoneNumber;

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
    res.clearCookie('access_token', { httpOnly: true });
    res.status(200).json({ message: 'User has been logged out' });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    errorHandler(error);
  }
};


export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset</title>
        </head>
        <body style="font-family: Arial, sans-serif;">

          <!-- Logo Section -->
          <div style="text-align: center;">
            <img src="http://localhost:5173/src/assets/services/vite.png" alt="Your Logo" style="max-width: 200px; margin-bottom: 20px;">
          </div>

          <!-- Email Content -->
          <div style="max-width: 600px; margin: 0 auto;">
            <p>Dear User,</p>
            <p>We hope this email finds you well. You are receiving this message because a request has been made to reset the password for your account.</p>
            <p>To proceed with the password reset, please click on the following link or copy-paste it into your browser:</p>
            <p><a href="${process.env.CLIENT_URL}/reset-password/${resetToken}">Reset Password</a></p>
            <p>If you did not initiate this request, you can safely disregard this email. Your password will remain unchanged.</p>
            <p>Thank you for your attention.</p>
            <p>Best regards,</p>
            <p>Your Application Team</p>
          </div>

        </body>
        </html>
      `,
    });

    res.status(200).json({
      message: "Password reset instructions have been sent to your email",
    });
  } catch (error) {
    errorHandler(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const resetPassword = async (req, res, next) => {
  const { resetToken } = req.params;
  const { password } = req.body;

  try {
    const decodedToken = jwt.verify(resetToken, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const hashedPassword = bcryptjs.hashSync(password, 12);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    errorHandler(error);
    res.status(400).json({ error: "Invalid or expired token" });
  }
};
