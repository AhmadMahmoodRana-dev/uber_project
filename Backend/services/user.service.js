import userModel from "../model/user.model.js";

export const createUser = async ({ firstname, lastname, password, email }) => {
  if (!firstname || !lastname || !password || !email) {
    throw new Error("All fields are required");
  }
  const user = new userModel({
    fullname: {
      firstname,
      lastname,
    },
    password,
    email,
  });
  return await user.save();
};
