
import { captainModel } from "../model/captain.model.js"

export const createCaptain = async ({
    firstname,
    lastname,
    password,
    email,
    color,
    plate,
    capacity,
    vehicletype
}) => {

    if (!firstname || !lastname || !password || !email || !color || !plate || !capacity || !vehicletype) {
        throw new Error("Please fill all the fields");
    }
    const captain = new captainModel({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicletype
        }
    });
    return await captain.save();
}