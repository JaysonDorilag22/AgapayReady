import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import cloudinary from "cloudinary";


export const register = async (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 12);

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already taken" });
    }

    let avatarUrl;
    // Check if an avatar is uploaded
    if (req.file) {
      // Upload avatar to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      avatarUrl = result.secure_url;
    }

    // If the email is not taken, create a new user
    const newUser = new User({
      firstname,
      lastname,
      email, 
      password: hashedPassword,
      avatar: avatarUrl 
    });
    await newUser.save();

    res.status(201).json("Successfully created a User");
  } catch (error) {
    next(error);
  }
};
//register
// export const register = async (req, res, next) => {
//   const { firstname, lastname, email, password } = req.body;
//   const hashedPassword = bcryptjs.hashSync(password, 12);

//   try {
//     // Check if the email already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ error: "Email is already taken" });
//     }

//     // If the email is not taken, create a new user
//     const newUser = new User({
//       firstname,
//       lastname,
//       email,
//       password: hashedPassword,
//     });
//     await newUser.save();

//     res.status(201).json("Successfully created a User");
//   } catch (error) {
//     next(error);
//   }
// };

//login
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(404, "User not found!");

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(401, "Wrong credentials!");

    const token = jwt.sign(
      { id: validUser._id, role: validUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    ); 
    const { password: pass, ...rest } = validUser._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ ...rest, role: validUser.role });
  } catch (error) {
    next(error);
  }
};


export const userProfile = async (req, res, next) => {
  try {
    // Retrieve user details from request object (assuming you're using JWT)
    const { userId } = req;

    // Find user by ID in the database
    const user = await User.findById(userId);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // If user exists, return user profile (excluding sensitive information like password)
    const { password, ...userData } = user._doc;
    res.status(200).json(userData);
  } catch (error) {
    // Handle any errors
    next(error);
  }
};
