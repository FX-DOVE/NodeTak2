import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/UserSchema";

const SECRET_KEY = process.env.JWT_SECRET as string;

// Register User
export const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    if(!email) res.status(401).send("emails filed cannot be empty")
    if(!password) res.status(401).send("password field cannot be empty")
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).send({ message: "Email already exists" });
      return
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ email, password: hashedPassword });
      await newUser.save();
      res.status(201).send({ message: "User registered successfully" });
    }
  } catch (error) {
    res.status(500).send({ message: "Server error", error });
    return
  }
};

// Login User
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    if(!email) res.status(401).send("emails filed cannot be empty")
        if(!password) res.status(401).send("password field cannot be empty")
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).send({ message: "Invalid credentials" });
      return
    } else {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).send({ message: "Invalid credentials" });
        return
      } else {
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "1h" });
        res.send({ token });
      }
    }
  } catch (error) {
    res.status(500).send({ message: "Server error", error });
    return
  }
};

