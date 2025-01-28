import { createCaptain } from "../services/captain.service.js"
import { captainModel } from "../model/captain.model.js";
import { validationResult } from "express-validator";

export const registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { fullname, email, password, vehicle } = req.body;
        const isCaptainExist = await captainModel.findOne({ email });
        if (isCaptainExist) {
            return res.status(400).json({ message: "Captain already exist" });
        }
        const hashedpassword = await captainModel.hashPassword(password);
        const captain = await createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedpassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicletype: vehicle.vehicletype
        });
        const token = captain.generateAuthToken();
        res.status(201).json({ message: "Captain created successfully", token, captain });
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "Error creating captain", error: error.message });
    }

}

export const loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { email, password } = req.body;
        const captain = await captainModel.findOne({ email }).select("+password");
        if (!captain) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isMatch = await captain.comparePassword(password, captain.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const token = captain.generateAuthToken();
        res.cookie("token", token);
        res.status(200).json({ message: "Captain logged in successfully", token, captain });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
}

export const logoutCaptain = async (req, res, next) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Captain logged out successfully" });
}

export const getCaptainProfile = async (req, res, next) => {
    try {
        const captain = await captainModel.findById(req.captain._id).populate("vehicle");
        if (!captain) {
            return res.status(404).json({ message: "Captain not found" });
        }
        res.status(200).json({ message: "Captain profile retrieved successfully", captain });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving captain profile", error: error.message });
    }
}
