import { Router } from "express";
import { body } from "express-validator";
import { getUserProfile, loginUser, logoutUser, registerUser } from "../controller/user.controller.js";
import {authUser,authCaptain} from "../middlewares/auth.middleware.js";
import { loginCaptain, registerCaptain,logoutCaptain,getCaptainProfile } from "../controller/captain.controller.js";
const auth = Router();

// USER

auth.post("/auth/register", [
  body("email").isEmail().withMessage("Invalid Email"),
  body("password").isLength({ min: 8 }).withMessage("Password must be atleast 8 characters"),
  body("fullname.firstname").isLength({ min: 3 }).withMessage("First name must be atleast 3 characters long"),
  body("fullname.lastname").isLength({ min: 3 }).withMessage("Last name must be atleast 3 characters long"),
], registerUser);

auth.post("/auth/login", [
  body("email").isEmail().withMessage("Invalid Email"),
  body("password").isLength({ min: 8 }).withMessage("Password must be atleast 8 characters")
], loginUser)

auth.get("/auth/profile", authUser, getUserProfile)
auth.get("/auth/logout", authUser, logoutUser)

// CAPTAIN USER 

auth.post("/auth/registercaptain", [
  body("email").isEmail().withMessage("Invalid Email"),
  body("password").isLength({ min: 8 }).withMessage("Password must be atleast 8 characters"),
  body("fullname.firstname").isLength({ min: 3 }).withMessage("First name must be atleast 3 characters long"),
  body("fullname.lastname").isLength({ min: 3 }).withMessage("Last name must be atleast 3 characters long"),
  body("vehicle.color").isLength({ min: 3 }).withMessage("Color must be atleast 3 characters long"),
  body("vehicle.plate").isLength({ min: 3 }).withMessage("Plate must be atleast 3 characters long"),
  body("vehicle.capacity").isNumeric().withMessage("Capacity must be a number"),
  body("vehicle.vehicletype").isIn(["car", "motorcycle", "auto"]).withMessage("Vehicle type must be car, motorcycle, or auto"),
], registerCaptain)

auth.post("/auth/loginCaptain", [
  body("email").isEmail().withMessage("Invalid Email"),
  body("password").isLength({ min: 8 }).withMessage("Password must be atleast 8 characters")
], loginCaptain)

auth.get("/auth/captainProfile", authCaptain, getCaptainProfile)
auth.get("/auth/logoutCaptain", authCaptain, logoutCaptain)

export default auth;