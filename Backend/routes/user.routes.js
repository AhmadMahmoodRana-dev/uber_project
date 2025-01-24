import { Router } from "express";
import { body } from "express-validator";
import { getUserProfile, loginUser, logoutUser, registerUser } from "../controller/user.controller.js";
import authUser from "../middlewares/auth.middleware.js";
const auth = Router();

auth.post("/auth/register", [
  body("email").isEmail().withMessage("Invalid Email"),
  body("password").isLength({ min: 8 }).withMessage("Password must be atleast 8 characters"),
  body("fullname.firstname").isLength({ min: 3 }).withMessage("First name must be atleast 3 characters long"),
  body("fullname.lastname").isLength({ min: 3 }).withMessage("Last name must be atleast 3 characters long"),
],registerUser);

auth.post("/auth/login" , [
  body("email").isEmail().withMessage("Invalid Email"),
  body("password").isLength({ min: 8 }).withMessage("Password must be atleast 8 characters")
],loginUser)

auth.get("/auth/profile",authUser,getUserProfile)
auth.get("/auth/logout",authUser,logoutUser)

export default auth;