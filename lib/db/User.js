const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    picture: {
      type: String,
      default: "../../sites/www/legekrogen/src/assets/img/users/no-user.jpg",
    },
    hashedPassword: { type: String, required: true },
    role: { type: String, enum: ["admin", "guest"], default: "guest" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
