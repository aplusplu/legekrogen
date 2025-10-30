const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "../../.env.local") });

const ProductModel = require("../models/Product");
const UserModel = require("../models/User");

const connectDB = require("../models/db");
const importProducts = require("../helpers/importProducts");
const importUsers = require("../helpers/importUsers");

const seedData = async (type) => {
  try {
    await connectDB();
    console.log("Connected to MongoDB");

    if (type === "products") {
      const products = importProducts();
      await ProductModel.deleteMany();
      await ProductModel.insertMany(products);
      console.log("Products imported");
    } else if (type === "users") {
      const users = importUsers();
      await UserModel.deleteMany();
      await UserModel.insertMany(users);
      console.log("Users imported");
    } else {
      console.log("Brug: node import.js products | users");
    }

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const arg = process.argv[2];
seedData(arg);
