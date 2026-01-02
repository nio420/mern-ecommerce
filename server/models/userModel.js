// six user schema

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
    phone: { type: String, default: "01XXXXXXXXX" },
    address: { type: String, default: "No Address Added" },
    date: { type: Number, default: Date.now },
  },
  { minimize: false }
);

const userModel = mongoose.model.user || mongoose.model("user", userSchema);

export default userModel;
