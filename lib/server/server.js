// lib/server/server.js
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "..", "..", ".env.local"),
});

const express = require("express");
const cors = require("cors");
const connectDB = require("../db/db.js");
const { errorHandler, notFound } = require("../middleware/errorMiddleware.js");
const productRoutes = require("../routes/productRoutes.js");
const userRoutes = require("../routes/userRoutes.js");

// 1) Conectare MongoDB
connectDB();

const app = express();

// 2) Parsare JSON body
app.use(express.json());

// 3) CORS (dev-friendly: reflectă originul automat)
//    -> elimină bătăile de cap când rulezi pe localhost/127.0.0.1,
//       http/https sau porturi diferite.
app.use(
  cors({
    origin: true,
    credentials: false, // true doar dacă trimiți cookies
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 4) Health check
app.get("/health", (_req, res) => res.json({ ok: true }));

// 5) Servire fișiere statice pentru avatare uploadate
//    (frontend: sites/www/legekrogen/public/users -> /users/...)
app.use(
  "/users",
  express.static(
    path.join(__dirname, "../../sites/www/legekrogen/public/users")
  )
);

// 6) Rute API
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

// 7) 404 + error handler (mereu la final)
app.use(notFound);
app.use(errorHandler);

// 8) Pornire server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server kører på port ${PORT}`));
