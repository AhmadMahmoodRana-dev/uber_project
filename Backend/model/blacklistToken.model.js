import mongoose from "mongoose";

const blacklistedTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt:{
    type:Date,
    default:Date.now,
    expire: 86400
  }
});

export const blacklistedTokenModel  = mongoose.model("BlacklistedToken", blacklistedTokenSchema);
