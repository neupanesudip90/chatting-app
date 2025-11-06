import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../model/userModel.js";

dotenv.config();

const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(403).json("Token not found!");

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json("Invalid token!");
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(404).json("User not found!");
    req.user = user;
    next();
  });
};

export default verifyToken;
