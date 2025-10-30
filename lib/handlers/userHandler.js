const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = async ({ name, email, role, password, image }) => {
  try {
    const existing = await User.findOne({ email });
    if (existing) return { status: "error", message: "Email findes allerede" };

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      role,
      hashedPassword,
      picture: image,
    });

    return { status: "ok", user: newUser };
  } catch (err) {
    return { status: "error", message: err.message };
  }
};

const updateUser = async (data) => {
  try {
    const { id, ...fields } = data;

    const user = await User.findById(id);
    if (!user) return { status: "not_found", message: "Bruger ikke fundet" };

    Object.assign(user, fields);
    await user.save();
    return { status: "ok", user };
  } catch (err) {
    return { status: "error", message: err.message };
  }
};

const deleteUser = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) return { status: "not_found", message: "Bruger ikke fundet" };
    await user.remove();
    return { status: "ok", message: "Bruger slettet" };
  } catch (err) {
    return { status: "error", message: err.message };
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) return { status: "not_found", message: "Bruger ikke fundet" };
    return { status: "ok", user };
  } catch (err) {
    return { status: "error", message: err.message };
  }
};

const getUsers = async () => {
  try {
    const users = await User.find({});
    return { status: "ok", users };
  } catch (err) {
    return { status: "error", message: err.message };
  }
};

const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user)
      return { status: "error", message: "Ugyldig email eller password" };

    const match = await bcrypt.compare(password, user.hashedPassword);
    if (!match)
      return { status: "error", message: "Ugyldig email eller password" };

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return { status: "ok", user, token };
  } catch (err) {
    return { status: "error", message: err.message };
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getUsers,
  loginUser,
};
