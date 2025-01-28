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
