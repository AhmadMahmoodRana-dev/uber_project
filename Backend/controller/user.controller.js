import userModel from "../model/user.model.js";
import { validationResult } from "express-validator";
import { createUser } from "../services/user.service.js";

export const registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: "Invalid data", errors: errors.array });
  }
  try {
    const { fullname, password, email } = req.body;
    console.log(req.body)
    const hashedpassword = await userModel.hashPassword(password);
    const user = await createUser({
      firstname:fullname.firstname,
      lastname:fullname.lastname,
      password: hashedpassword,
      email,
    });
    const token = user.generateAuthToken();
    res.status(201).json({ message: "User created successfully", token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user", error: error.message });
  }
};
