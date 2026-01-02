// seven userCredentials
import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// route for user login
const loginUser = async (req, res) => {
  try {
    // Destructure email and password from the request body
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    // Check if the user exists in the database by their email
    if (!user) {
      return res.json({ success: false, message: "User doesn't exists" });
    }
    // Compare the provided password with the hashed password stored in the DB
    const isMatch = await bcrypt.compare(password, user.password);
    // If password matches, generate a JWT token and send it to the frontend
    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid userCredentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// route for user registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exists = await userModel.findOne({ email });

    // --- THE EASY TYPO FIX
    const badDomains = ["gamil.com", "gmal.com", "yaho.com", "hotmal.com"];
    const userDomain = email.split("@")[1];

    if (badDomains.includes(userDomain)) {
      return res.json({
        success: false,
        message: "Email typo detected! Did you mean gmail.com?",
      });
    }

    // checking user already exist or not
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }
    // validating email format and password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    // Updated strong password check
    if (
      !validator.isStrongPassword(password.trim(), {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0,
      })
    ) {
      return res.json({
        success: false,
        message:
          "Password must be at least 8 characters long and include uppercase, lowercase, a number.",
      });
    }

    // 3. Hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Creating and Saving the new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    // save the user in DB
    const user = await newUser.save();

    // 5. Generate JWT Token
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// route for admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ email, password }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// user control for profile
const getProfile = async (req, res) => {
  try {
    // The 'userId' comes from your 'auth' middleware
    const user = await userModel.findById(req.body.userId).select("-password");

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


export { loginUser, registerUser, adminLogin, getProfile };
