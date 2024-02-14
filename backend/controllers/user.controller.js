import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';


//sign up
export const register = async (req, res, next) => {
    const { firstname, lastname, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 12); 
  
    try {
      // Check if the email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email is already taken' });
      }

      // If the email is not taken, create a new user
      const newUser = new User({ firstname, lastname, email, password: hashedPassword });
      await newUser.save();
      
      res.status(201).json('Successfully created a User');
    } catch (error) {
      next(error);
    }
};

//sign up
export const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const validUser = await User.findOne({ email });
      if (!validUser) return next(errorHandler(404, 'User not found!'));
  
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
  
      const token = jwt.sign({ id: validUser._id, role: validUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Token expiration set to 1 hour
      const { password: pass, ...rest } = validUser._doc;
  
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json({ ...rest, role: validUser.role }); 
    } catch (error) {
      next(error);
    }
};
