import jwt from "jsonwebtoken";
import userModel from "../model/user.model.js";
import { blacklistedTokenModel } from "../model/blacklistToken.model.js";
import { captainModel } from "../model/captain.model.js";

export const authUser = async (req, res, next) => {
  // First check for token in cookies
  let token = req.cookies.token;
  
  // If no cookie token, try authorization header
  if (!token && req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Unauthorized - No token provided" });
  }

  // Check if token is blacklisted
  const blacklistedToken = await blacklistedTokenModel.findOne({ token });
  if (blacklistedToken) {
    return res.status(401).json({ message: "Unauthorized - Token blacklisted" });
  } 

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }
    req.user = user;
    return next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

export const authCaptain = async (req, res, next) => {
   // First check for token in cookies
   let token = req.cookies.token;
  
   // If no cookie token, try authorization header
   if (!token && req.headers.authorization) {
     token = req.headers.authorization.split(" ")[1];
   }
 
   if (!token) {
     return res.status(401).json({ message: "Unauthorized - No token provided" });
   }
 
   // Check if token is blacklisted
   const blacklistedToken = await blacklistedTokenModel.findOne({ token });
   if (blacklistedToken) {
     return res.status(401).json({ message: "Unauthorized - Token blacklisted" });
   } 
 
   try {
     const decoded = jwt.verify(token, process.env.JWT_SECRET);
     const captain = await captainModel.findById(decoded._id);
     if (!captain) {
       return res.status(401).json({ message: "Unauthorized - Captain not found" });
     }
     req.captain = captain;
     return next();
   } catch (error) {
     console.error("Auth Error:", error.message);
     return res.status(401).json({ message: "Unauthorized - Invalid token" });
   }
};


