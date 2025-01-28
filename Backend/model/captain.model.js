import mongoose from 'mongoose'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const captainSchema = new mongoose.Schema({
   fullname: {
      firstname: {
         type: String,
         required: true,
         minlength: [3, 'first name must be at least 3 characters long'],
      },
      lastname: {
         type: String,
         required: true,
         minlength: [3, 'last name must be at least 3 characters long'],
      },
   },
   email: {
      type: String,
      required: true,
      unique: true,
      validate: {
         validator: function (value) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
         },
         message: (props) => `${props.value} is not a valid email address!`,
      },
   },
   password: {
      type: String,
      required: true,
      minlength: [8, 'Password must be at least 8 characters long'],
      select: false,
   },
   socketId: {
      type: String,
   },
   status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
   },
   vehicle: {
      color: {
         type: String,
         required: true,
         minlength: [3, 'color must be at least 3 characters long'],
      },
      plate: {
         type: String,
         required: true,
         minlength: [3, 'plate must be at least 3 characters long'],
      },
      capacity: {
         type: Number,
         required: true,
         min: [1, 'capacity must be at least 1 person'],
      },
      vehicletype: {
         type: String,
         required: true,
         enum: ['car', 'motorcycle', 'auto'],
      },
   },
   location:{
    lat:{
        type: Number,
    },
    lng:{
        type: Number,
    }
   }
})

captainSchema.methods.generateAuthToken = function () {
   const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
   });
   return token;
}
captainSchema.methods.comparePassword = async function (password) {
   return await bcrypt.compare(password, this.password);
}
captainSchema.statics.hashPassword = async function (password) {
   return await bcrypt.hash(password, 10);
}

export const captainModel = mongoose.model("Captain", captainSchema);