import User from "../Models/user.js";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/generateToke.js";
import { errorHandling } from "../middlewares/errorHandling.js";

// create user
export const regesterUser = async (req, res, next) => {
  let { name, email, password, role } = req.body;
  try {
    email = email.toLowerCase();
    const existUser = await User.findOne({ email });
    if (existUser) return res.status(400).json("this email already in use ");
    const user = await User.create({ name, email, password, role });
    const token = generateToken(user._id);
    res.status(201).json({ token });
   
  } catch (err) {
    console.log("error server", err);
   
  next()
  }
};

// log in user

export const logInUser = async (req, res, next) => {
  let { email, password } = req.body;
  try {
    email = email?.toLowerCase();
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json("invalid password or email");
    }

    const token = generateToken(user._id);
    res.json({ token });
  } catch (err) {
    console.log("error", err);
    next(err);
  }
};

// protect route

export const protectedRoute = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json("not provide token");
  console.log("token", token);

  // validated toking or checking

  try {
    const decode = jwt.verify(token, process.env.JWB_TOKEN);
    console.log("decoce", decode);
    req.user = await User.findById(decode.userId).select("-password");
    console.log("req.user", req.user);
    next();
  } catch (err) {
    res.status(401).json("invalid  or expired token");
  }
};
