const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "..", "..", ".env.local"), // robust absolute path
});

const express = require("express");
const connectDB = require("../db/db.js");
const { errorHandler, notFound } = require("../middleware/errorMiddleware.js");
const productRoutes = require("../routes/productRoutes.js");

// Connect to Mongo
connectDB();

const app = express();
app.use(express.json());

// routes
app.use("/api/products", productRoutes);

// errors
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server kører på port ${PORT}`));
