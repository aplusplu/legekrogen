// lib/handlers/productHandler.js
const Product = require("../db/Product");
const seedData = require("../../data/products.json");

/* GET /api/products */
const getProducts = async (_req, res) => {
  try {
    const all = await Product.find({}).lean();
    res.json(all);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* GET /api/products/:id */
const getProductById = async (req, res) => {
  try {
    const prod = await Product.findById(req.params.id).lean();
    if (!prod) return res.status(404).json({ message: "Produkt ikke fundet" });
    res.json(prod);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* POST /api/products/import  (dev-only) */
const importProducts = async (_req, res) => {
  try {
    await Product.deleteMany({});
    const created = await Product.insertMany(seedData);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* POST /api/products */
const createProduct = async (req, res) => {
  try {
    const { name, price, description, image } = req.body;
    if (!name || price == null) {
      return res
        .status(400)
        .json({ message: "name și price sunt obligatorii" });
    }
    const saved = await Product.create({ name, price, description, image });
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* PUT /api/products/:id */
const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).lean();
    if (!updated)
      return res.status(404).json({ message: "Produkt ikke fundet" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* DELETE /api/products/:id */
const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Produkt ikke fundet" });
    res.json({ message: "Produkt slettet" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  importProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
