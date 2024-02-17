import User from "../models/user.model.js";
import Department from "../models/department.model.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import cloudinary from "cloudinary";


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
    next(error);
  }
};

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
    const { userId } = req;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const { password, ...userData } = user._doc;
    res.status(200).json(userData);
  } catch (error) {
    next(error);
  }
};
