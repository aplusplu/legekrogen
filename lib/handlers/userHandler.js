// lib/handlers/userHandler.js
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../db/User");

/* Helpers */
const stripUser = (u) => {
  if (!u) return null;
  const obj = typeof u.toObject === "function" ? u.toObject() : u;
  const { hashedPassword, __v, ...safe } = obj;
  return safe;
};

const signToken = (user) =>
  jwt.sign(
    { id: user._id, role: user.role, name: user.name, picture: user.picture },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );

/* CREATE */
const createUser = async ({ name, email, role, password, image }) => {
  try {
    if (!name || !email || !password) {
      return {
        status: "error",
        message: "Nume, email și parolă sunt obligatorii",
      };
    }

    const existing = await User.findOne({ email });
    if (existing) return { status: "error", message: "Email findes allerede" };

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      role: role || "guest",
      hashedPassword,
      picture: image || "/users/no-user.jpg",
    });
    return { status: "ok", user: stripUser(newUser) };
  } catch (err) {
    return { status: "error", message: err.message };
  }
};

/* UPDATE (opțional schimbare parolă) */
const updateUser = async (data) => {
  try {
    const { id, password, ...fields } = data;
    const user = await User.findById(id);
    if (!user) return { status: "not_found", message: "Bruger ikke fundet" };

    if (password && password.trim()) {
      user.hashedPassword = await bcrypt.hash(password, 10);
    }
    Object.assign(user, fields);
    await user.save();
    return { status: "ok", user: stripUser(user) };
  } catch (err) {
    return { status: "error", message: err.message };
  }
};

/* DELETE */
const deleteUser = async (id) => {
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) return { status: "not_found", message: "Bruger ikke fundet" };
    return { status: "ok", message: "Bruger slettet" };
  } catch (err) {
    return { status: "error", message: err.message };
  }
};

/* READ ONE */
const getUserById = async (id) => {
  try {
    const user = await User.findById(id).select("-hashedPassword -__v").lean();
    if (!user) return { status: "not_found", message: "Bruger ikke fundet" };
    return { status: "ok", user };
  } catch (err) {
    return { status: "error", message: err.message };
  }
};

/* READ ALL */
const getUsers = async () => {
  try {
    const users = await User.find({}).select("-hashedPassword -__v").lean();
    return { status: "ok", users };
  } catch (err) {
    return { status: "error", message: err.message };
  }
};

/* LOGIN */
const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user)
      return { status: "error", message: "Ugyldig email eller password" };

    const match = await bcrypt.compare(password, user.hashedPassword);
    if (!match)
      return { status: "error", message: "Ugyldig email eller password" };

    const token = signToken(user);
    return { status: "ok", user: stripUser(user), token };
  } catch (err) {
    return { status: "error", message: err.message };
  }
};

/* DEV SEED: citește din data/users.json (hash-uri deja generate) */
const seedUsers = async () => {
  try {
    const file = path.join(__dirname, "../../data/users.json");
    const json = JSON.parse(fs.readFileSync(file, "utf-8"));

    // validare minimă
    const docs = json.map((u) => ({
      name: u.name,
      email: u.email,
      role: u.role || "guest",
      picture: "/users/no-user.jpg",
      hashedPassword: u.hashedPassword, // hash existent în fișierul tău
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await User.deleteMany({});
    const created = await User.insertMany(docs);
    return { status: "ok", count: created.length };
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
  seedUsers,
};
