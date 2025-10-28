const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = (process.env.MONGO_URI || "").trim(); // trims stray spaces
    if (!uri) throw new Error("MONGO_URI is missing");
    await mongoose.connect(uri);
    console.log(`✅ MongoDB Connected: ${mongoose.connection.host}`);
  } catch (err) {
    console.error(`❌ MongoDB Fejl: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
