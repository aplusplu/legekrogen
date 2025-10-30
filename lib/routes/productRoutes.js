// lib/routes/productRoutes.js
const express = require("express");
const {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  importProducts,
  updateProduct,
} = require("../handlers/productHandler.js");

const router = express.Router();

/* DEV seed – pune-l ÎNAINTE de :id ca să nu fie capturat */
router.post("/import/dev", importProducts);

/* CRUD */
router.get("/", getProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/:id", getProductById);

module.exports = router;
