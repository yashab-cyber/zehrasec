import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import User from "../models/User.models.js";

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate inputs
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }
    if (!validator.isLength(username, { min: 3 })) {
        return res.status(400).json({ message: "Username must be at least 3 characters" });
    }
    if (!validator.isStrongPassword(password, { minLength: 6 })) {
        return res.status(400).json({ message: "Password must be at least 6 characters with a mix of letters and numbers" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "365d" });

    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export{ login , register};
