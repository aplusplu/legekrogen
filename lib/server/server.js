require("dotenv").config({ path: ".env.local" });
const express = require("express");
const connectDB = require("../models/db.js");
const { errorHandler, notFound } = require("../middleware/errorMiddleware.js");
const productRoutes = require("../routes/productRoutes.js");
const userRoutes = require("../routes/userRoutes.js");
const cors = require("cors");

// Forbind til MongoDB
connectDB();

const app = express();

// Middleware: parse JSON i body
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server kører på port ${PORT}`));

module.exports = app;
